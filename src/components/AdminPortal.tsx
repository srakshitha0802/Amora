import React from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  ChevronRight,
  CircleHelp,
  Eye,
  ImagePlus,
  LayoutDashboard,
  LogOut,
  Package,
  Pencil,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
  X,
} from 'lucide-react';
import { BRAND_LOGO_URL } from '../data/products';
import type { ProductCategory } from '../types';
import {
  deleteCatalogProduct,
  getAllCatalogProducts,
  PRODUCT_CATEGORIES,
  saveCatalogProduct,
  type CatalogProduct,
  type ProductStatus,
} from '../services/productCatalog';
import './admin.css';

const SESSION_KEY = 'amora_admin_session_v1';
const LOGIN_DIGEST = 'a19fa94308358d94e728645cf6b43b13bf40c1caf0c3b95884398f49f21a40dd';
const IMAGE_SIZE_LIMIT = 5 * 1024 * 1024;
const DEFAULT_ACCENT = '#6D2E58';

type AdminPage = 'overview' | 'products' | 'editor';

interface ProductForm {
  name: string;
  category: Exclude<ProductCategory, 'All'>;
  price: string;
  description: string;
  imageUrl: string;
  status: ProductStatus;
}

function getRouteState(pathname: string): { page: AdminPage; productId: string | null } {
  const editMatch = pathname.match(/^\/admin\/products\/([^/]+)\/edit\/?$/);
  if (editMatch) return { page: 'editor', productId: decodeURIComponent(editMatch[1]) };
  if (/^\/admin\/products\/new\/?$/.test(pathname)) return { page: 'editor', productId: null };
  if (/^\/admin\/products\/?$/.test(pathname)) return { page: 'products', productId: null };
  return { page: 'overview', productId: null };
}

function hasAdminSession(): boolean {
  try {
    return window.sessionStorage.getItem(SESSION_KEY) === 'active';
  } catch {
    return false;
  }
}

function formatPrice(value: number): string {
  return `₹${value.toLocaleString('en-IN')}`;
}

function asProductForm(product?: CatalogProduct): ProductForm {
  return {
    name: product?.name ?? '',
    category: product?.primaryCategory ?? 'Personalised Gifts',
    price: product ? String(product.price) : '',
    description: product?.description ?? '',
    imageUrl: product?.imageUrl ?? '',
    status: product?.status ?? 'draft',
  };
}

function readImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') resolve(reader.result);
      else reject(new Error('The selected image could not be read.'));
    };
    reader.onerror = () => reject(new Error('The selected image could not be read.'));
    reader.readAsDataURL(file);
  });
}

function productIdFromName(name: string): string {
  const slug = name
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48);
  return `${slug || 'product'}-${Date.now().toString(36)}`;
}

export default function AdminPortal() {
  const [authenticated, setAuthenticated] = React.useState(hasAdminSession);
  const [route, setRoute] = React.useState(() => getRouteState(window.location.pathname));
  const [catalog, setCatalog] = React.useState<CatalogProduct[]>([]);
  const [catalogLoading, setCatalogLoading] = React.useState(false);
  const [catalogError, setCatalogError] = React.useState<string | null>(null);
  const [loginEmail, setLoginEmail] = React.useState('');
  const [loginPassword, setLoginPassword] = React.useState('');
  const [loginError, setLoginError] = React.useState<string | null>(null);
  const [notice, setNotice] = React.useState<{ kind: 'success' | 'error'; text: string } | null>(null);
  const [search, setSearch] = React.useState('');
  const [form, setForm] = React.useState<ProductForm>(() => asProductForm());
  const [previewOpen, setPreviewOpen] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [imageName, setImageName] = React.useState('');

  const refreshCatalog = React.useCallback(async () => {
    setCatalogLoading(true);
    try {
      setCatalog(await getAllCatalogProducts());
      setCatalogError(null);
    } catch (error) {
      setCatalogError(error instanceof Error ? error.message : 'Could not load the product catalog.');
    } finally {
      setCatalogLoading(false);
    }
  }, []);

  React.useEffect(() => {
    const handlePopState = () => setRoute(getRouteState(window.location.pathname));
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  React.useEffect(() => {
    if (authenticated) void refreshCatalog();
  }, [authenticated, refreshCatalog]);

  React.useEffect(() => {
    if (route.page !== 'editor' || !authenticated) return;
    const product = route.productId
      ? catalog.find((item) => item.id === route.productId)
      : undefined;
    setForm(asProductForm(product));
    setImageName('');
    setPreviewOpen(false);
  }, [route, catalog, authenticated]);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setRoute(getRouteState(path));
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginError(null);
    try {
      const credential = `${loginEmail.trim().toLowerCase()}:${loginPassword}`;
      const bytes = await window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(credential));
      const digest = Array.from(new Uint8Array(bytes), (byte) =>
        byte.toString(16).padStart(2, '0')
      ).join('');
      if (digest !== LOGIN_DIGEST) {
        setLoginError('Those sign-in details do not match. Please try again.');
        return;
      }
      window.sessionStorage.setItem(SESSION_KEY, 'active');
      setAuthenticated(true);
      setLoginPassword('');
    } catch {
      setLoginError('This browser could not start a secure login session. Enable browser storage and try again.');
    }
  };

  const handleLogout = () => {
    try {
      window.sessionStorage.removeItem(SESSION_KEY);
      setAuthenticated(false);
      setLoginPassword('');
      setNotice(null);
      navigate('/admin');
    } catch {
      setNotice({ kind: 'error', text: 'Could not clear the admin session in this browser.' });
    }
  };

  const beginNewProduct = () => {
    setForm(asProductForm());
    setImageName('');
    navigate('/admin/products/new');
  };

  const beginEditProduct = (product: CatalogProduct) => {
    setForm(asProductForm(product));
    setImageName('');
    navigate(`/admin/products/${encodeURIComponent(product.id)}/edit`);
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setNotice({ kind: 'error', text: 'Choose a supported image file.' });
      return;
    }
    if (file.size > IMAGE_SIZE_LIMIT) {
      setNotice({ kind: 'error', text: 'Images must be 5 MB or smaller.' });
      return;
    }
    try {
      const imageUrl = await readImage(file);
      setForm((current) => ({ ...current, imageUrl }));
      setImageName(file.name);
      setNotice(null);
    } catch (error) {
      setNotice({
        kind: 'error',
        text: error instanceof Error ? error.message : 'Could not read the selected image.',
      });
    }
  };

  const saveProduct = async (status: ProductStatus) => {
    const name = form.name.trim();
    const description = form.description.trim();
    const price = Number(form.price);
    if (!name || !description || !Number.isFinite(price) || price < 0 || !form.imageUrl) {
      setNotice({
        kind: 'error',
        text: 'Add a name, image, non-negative price, and description before saving.',
      });
      return;
    }

    const existing = route.productId
      ? catalog.find((item) => item.id === route.productId)
      : undefined;
    if (route.productId && !existing) {
      setNotice({ kind: 'error', text: 'This product no longer exists. Refresh the catalog and try again.' });
      return;
    }

    const isBulkOnly = form.category === 'Corporate Merchandise';
    const unitLabel = existing?.unitLabel ?? (isBulkOnly ? 'per piece' : 'per item');
    const product: CatalogProduct = {
      ...(existing ?? {}),
      id: existing?.id ?? productIdFromName(name),
      name,
      shortName: existing?.name === name ? existing.shortName : name,
      categories: [form.category],
      primaryCategory: form.category,
      isBulkOnly,
      moq: isBulkOnly ? Math.max(existing?.moq ?? 36, 36) : 1,
      price: Math.round(price * 100) / 100,
      priceLabel: `${formatPrice(price)} / ${unitLabel.replace(/^per\s+/, '')}`,
      unitPriceEstimate: price,
      unitLabel,
      description,
      specs: existing?.specs ?? [],
      visualType: existing?.visualType ?? 'photocards-posters',
      defaultAccent: existing?.defaultAccent ?? DEFAULT_ACCENT,
      defaultSampleText: existing?.defaultSampleText ?? 'amora.co',
      imageUrl: form.imageUrl,
      status,
    };

    setSaving(true);
    try {
      await saveCatalogProduct(product);
      await refreshCatalog();
      setNotice({
        kind: 'success',
        text: status === 'published' ? 'Product published to this browser’s catalog.' : 'Draft saved successfully.',
      });
      navigate('/admin/products');
    } catch (error) {
      setNotice({
        kind: 'error',
        text: error instanceof Error ? error.message : 'Could not save this product.',
      });
    } finally {
      setSaving(false);
    }
  };

  const changeProductStatus = async (product: CatalogProduct, status: ProductStatus) => {
    try {
      await saveCatalogProduct({ ...product, status });
      await refreshCatalog();
      setNotice({
        kind: 'success',
        text: status === 'published' ? `${product.name} is now published.` : `${product.name} is now a draft.`,
      });
    } catch (error) {
      setNotice({
        kind: 'error',
        text: error instanceof Error ? error.message : 'Could not update product status.',
      });
    }
  };

  const removeProduct = async (product: CatalogProduct) => {
    if (!window.confirm(`Delete “${product.name}”? This also removes it from the public catalog on this browser.`)) {
      return;
    }
    try {
      await deleteCatalogProduct(product.id);
      await refreshCatalog();
      setNotice({ kind: 'success', text: `${product.name} was deleted.` });
    } catch (error) {
      setNotice({
        kind: 'error',
        text: error instanceof Error ? error.message : 'Could not delete this product.',
      });
    }
  };

  const filteredCatalog = catalog.filter((product) => {
    const query = search.trim().toLowerCase();
    return !query || `${product.name} ${product.primaryCategory}`.toLowerCase().includes(query);
  });
  const publishedCount = catalog.filter((product) => product.status === 'published').length;
  const draftCount = catalog.length - publishedCount;
  const editingProduct = route.productId
    ? catalog.find((product) => product.id === route.productId)
    : undefined;

  if (!authenticated) {
    return (
      <main className="admin-login">
        <div className="admin-login-backdrop" aria-hidden="true" />
        <a className="admin-login-brand" href="/">
          <img src={BRAND_LOGO_URL} alt="" />
          <span>amora<span className="admin-brand-dot">.</span></span>
        </a>
        <section className="admin-login-card">
          <div className="admin-eyebrow"><ShieldCheck size={15} /> STUDIO ADMIN</div>
          <h1>Welcome back.</h1>
          <p>Sign in to curate your Amora product catalogue.</p>
          <form onSubmit={handleLogin} className="admin-login-form">
            <label>
              Email address
              <input
                autoComplete="username"
                type="email"
                value={loginEmail}
                onChange={(event) => setLoginEmail(event.currentTarget.value)}
                placeholder="admin@amora.com"
                required
              />
            </label>
            <label>
              Password
              <input
                autoComplete="current-password"
                type="password"
                value={loginPassword}
                onChange={(event) => setLoginPassword(event.currentTarget.value)}
                placeholder="Enter your password"
                required
              />
            </label>
            {loginError && <p className="admin-form-error" role="alert">{loginError}</p>}
            <button type="submit" className="admin-primary-button">Sign in <ArrowUpRight size={16} /></button>
          </form>
          <p className="admin-login-footnote"><CircleHelp size={14} /> Demo sign-in: admin@amora.com / amora2026. Client-side access only — not secure authentication.</p>
        </section>
        <a className="admin-back-link" href="/"> <ArrowLeft size={15} /> Back to Amora.co</a>
      </main>
    );
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <a className="admin-sidebar-brand" href="/">
          <img src={BRAND_LOGO_URL} alt="" />
          <span>amora<span className="admin-brand-dot">.</span><small>STUDIO ADMIN</small></span>
        </a>
        <div className="admin-sidebar-label">WORKSPACE</div>
        <nav className="admin-nav" aria-label="Admin">
          <button
            type="button"
            className={route.page === 'overview' ? 'is-active' : ''}
            onClick={() => navigate('/admin')}
          ><LayoutDashboard size={17} /> Overview</button>
          <button
            type="button"
            className={route.page === 'products' || route.page === 'editor' ? 'is-active' : ''}
            onClick={() => navigate('/admin/products')}
          ><Package size={17} /> Products <ChevronRight className="admin-nav-chevron" size={15} /></button>
        </nav>
        <div className="admin-sidebar-bottom">
          <a href="/" className="admin-view-site"><ArrowUpRight size={16} /> View website</a>
          <button type="button" onClick={handleLogout} className="admin-logout"><LogOut size={16} /> Sign out</button>
          <div className="admin-session-note"><span /> Admin session active</div>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div className="admin-breadcrumb">Workspace <ChevronRight size={14} /> <span>{route.page === 'editor' ? (editingProduct ? 'Edit product' : 'New product') : route.page === 'products' ? 'Products' : 'Overview'}</span></div>
          <div className="admin-topbar-actions">
            <a href="/" className="admin-store-link"><ArrowUpRight size={15} /> Visit storefront</a>
            <span className="admin-avatar" aria-label="Admin">A</span>
          </div>
        </header>

        {notice && (
          <div className={`admin-notice is-${notice.kind}`} role={notice.kind === 'error' ? 'alert' : 'status'}>
            {notice.kind === 'success' ? <Check size={16} /> : <CircleHelp size={16} />}
            <span>{notice.text}</span>
            <button type="button" aria-label="Dismiss message" onClick={() => setNotice(null)}><X size={15} /></button>
          </div>
        )}
        {catalogError && (
          <div className="admin-notice is-error" role="alert">
            <CircleHelp size={16} /><span>{catalogError}</span>
            <button type="button" onClick={() => void refreshCatalog()}>Retry</button>
          </div>
        )}

        {route.page === 'overview' && (
          <section className="admin-content">
            <div className="admin-page-heading">
              <div><div className="admin-eyebrow">YOUR STUDIO, AT A GLANCE</div><h1>Good to see you.</h1><p>Manage the products that tell the Amora story.</p></div>
              <button type="button" className="admin-primary-button" onClick={beginNewProduct}><Plus size={17} /> Add product</button>
            </div>
            <div className="admin-stat-grid">
              <article className="admin-stat-card"><span className="admin-stat-icon"><Package size={18} /></span><span className="admin-stat-label">Total products</span><strong>{catalog.length}</strong><small>In your catalogue</small></article>
              <article className="admin-stat-card"><span className="admin-stat-icon is-published"><Check size={18} /></span><span className="admin-stat-label">Published</span><strong>{publishedCount}</strong><small>Visible on this device</small></article>
              <article className="admin-stat-card"><span className="admin-stat-icon is-draft"><Pencil size={17} /></span><span className="admin-stat-label">Drafts</span><strong>{draftCount}</strong><small>Only visible to you</small></article>
            </div>
            <div className="admin-overview-grid">
              <section className="admin-panel admin-recent-panel">
                <div className="admin-panel-heading"><div><h2>Recently added</h2><p>Your latest catalogue additions</p></div><button type="button" className="admin-text-button" onClick={() => navigate('/admin/products')}>View all <ArrowUpRight size={15} /></button></div>
                {catalogLoading ? <p className="admin-empty">Loading your catalogue…</p> : catalog.length ? (
                  <div className="admin-recent-list">
                    {[...catalog].slice(-5).reverse().map((product) => (
                      <button key={product.id} type="button" onClick={() => beginEditProduct(product)} className="admin-recent-row">
                        {product.imageUrl ? <img src={product.imageUrl} alt="" /> : <span className="admin-image-placeholder"><ImagePlus size={17} /></span>}
                        <span className="admin-recent-name"><strong>{product.name}</strong><small>{product.primaryCategory}</small></span>
                        <span className={`admin-status is-${product.status}`}>{product.status}</span><ChevronRight size={15} />
                      </button>
                    ))}
                  </div>
                ) : <p className="admin-empty">Your products will appear here.</p>}
              </section>
              <aside className="admin-tip-card">
                <span className="admin-tip-icon"><ShieldCheck size={19} /></span>
                <h2>Your catalogue, your device</h2>
                <p>Products and uploads are stored in this browser. Publishing here does not sync changes to other visitors or devices.</p>
                <button type="button" className="admin-text-button" onClick={() => navigate('/admin/products')}>Manage products <ArrowUpRight size={15} /></button>
              </aside>
            </div>
          </section>
        )}

        {route.page === 'products' && (
          <section className="admin-content">
            <div className="admin-page-heading">
              <div><div className="admin-eyebrow">THE AMORA COLLECTION</div><h1>Products</h1><p>{catalog.length} products in your catalogue</p></div>
              <button type="button" className="admin-primary-button" onClick={beginNewProduct}><Plus size={17} /> Add product</button>
            </div>
            <div className="admin-catalog-toolbar">
              <label className="admin-search"><Search size={16} /><input value={search} onChange={(event) => setSearch(event.currentTarget.value)} placeholder="Search products or categories" /></label>
              <span className="admin-catalog-count">{filteredCatalog.length} shown</span>
            </div>
            {catalogLoading ? <p className="admin-empty">Loading your catalogue…</p> : filteredCatalog.length ? (
              <div className="admin-product-grid">
                {filteredCatalog.map((product) => (
                  <article className="admin-product-card" key={product.id}>
                    <div className="admin-product-photo">
                      {product.imageUrl ? <img src={product.imageUrl} alt={product.name} /> : <span className="admin-image-placeholder"><ImagePlus size={24} />Image needed</span>}
                      <span className={`admin-status is-${product.status}`}>{product.status}</span>
                    </div>
                    <div className="admin-product-card-body">
                      <span className="admin-product-category">{product.primaryCategory}</span>
                      <h2>{product.name}</h2>
                      <p className="admin-product-price">{formatPrice(product.price)} <small>{product.unitLabel}</small></p>
                      <p className="admin-product-description">{product.description}</p>
                      <div className="admin-product-actions">
                        <button type="button" onClick={() => beginEditProduct(product)}><Pencil size={14} /> Edit</button>
                        <button type="button" onClick={() => void changeProductStatus(product, product.status === 'published' ? 'draft' : 'published')}>
                          {product.status === 'published' ? <><Eye size={14} /> Unpublish</> : <><Check size={14} /> Publish</>}
                        </button>
                        <button type="button" className="is-delete" aria-label={`Delete ${product.name}`} onClick={() => void removeProduct(product)}><Trash2 size={14} /></button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : <div className="admin-empty-card"><Package size={25} /><h2>No products found</h2><p>Try a different search or add your first product.</p><button type="button" className="admin-primary-button" onClick={beginNewProduct}><Plus size={16} /> Add product</button></div>}
          </section>
        )}

        {route.page === 'editor' && (
          <section className="admin-content">
            <button type="button" className="admin-back-button" onClick={() => navigate('/admin/products')}><ArrowLeft size={15} /> Back to products</button>
            <div className="admin-page-heading admin-editor-heading">
              <div><div className="admin-eyebrow">PRODUCT CATALOGUE</div><h1>{editingProduct ? 'Edit product' : 'Create a product'}</h1><p>Give every detail a little thought. You can preview before saving.</p></div>
              <span className={`admin-status is-${form.status}`}>{form.status}</span>
            </div>
            {route.productId && !editingProduct ? (
              <div className="admin-empty-card"><CircleHelp size={24} /><h2>Product not found</h2><p>This product may have been removed from another browser tab.</p><button type="button" onClick={() => navigate('/admin/products')} className="admin-secondary-button">Return to products</button></div>
            ) : (
              <form className="admin-editor-layout" onSubmit={(event) => event.preventDefault()}>
                <div className="admin-editor-fields">
                  <section className="admin-panel">
                    <div className="admin-panel-heading"><div><h2>Product details</h2><p>These details are shown in the public catalogue.</p></div><span className="admin-step">01</span></div>
                    <label className="admin-field">Product name<input value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.currentTarget.value }))} placeholder="e.g. Keepsake Polaroid Set" required /></label>
                    <div className="admin-field-row">
                      <label className="admin-field">Category<select value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.currentTarget.value as ProductForm['category'] }))}>{PRODUCT_CATEGORIES.map((category) => <option key={category} value={category}>{category}</option>)}</select></label>
                      <label className="admin-field">Price (₹)<input type="number" min="0" step="0.01" value={form.price} onChange={(event) => setForm((current) => ({ ...current, price: event.currentTarget.value }))} placeholder="0.00" required /></label>
                    </div>
                    <label className="admin-field">Description<textarea value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.currentTarget.value }))} placeholder="Describe the materials, finish, and little details that make it special…" rows={5} required /></label>
                  </section>
                  <section className="admin-panel">
                    <div className="admin-panel-heading"><div><h2>Product image</h2><p>Upload a clear image, up to 5 MB.</p></div><span className="admin-step">02</span></div>
                    <label className="admin-upload-zone">
                      {form.imageUrl ? <img src={form.imageUrl} alt="Product image preview" /> : <span className="admin-upload-prompt"><ImagePlus size={25} /><strong>Choose an image</strong><small>PNG, JPG, WEBP · up to 5 MB</small></span>}
                      <input type="file" accept="image/*" onChange={(event) => void handleImageChange(event)} />
                    </label>
                    <div className="admin-upload-meta">{imageName || (form.imageUrl ? 'Current product image' : 'No image selected')} {form.imageUrl && <label className="admin-replace-image">Replace image<input type="file" accept="image/*" onChange={(event) => void handleImageChange(event)} /></label>}</div>
                  </section>
                  <section className="admin-panel">
                    <div className="admin-panel-heading"><div><h2>Publishing</h2><p>Drafts stay hidden from public visitors.</p></div><span className="admin-step">03</span></div>
                    <div className="admin-publish-options">
                      <button type="button" className={form.status === 'draft' ? 'is-selected' : ''} onClick={() => setForm((current) => ({ ...current, status: 'draft' }))}><Pencil size={16} /><span><strong>Save as draft</strong><small>Keep this product private</small></span>{form.status === 'draft' && <Check size={16} />}</button>
                      <button type="button" className={form.status === 'published' ? 'is-selected' : ''} onClick={() => setForm((current) => ({ ...current, status: 'published' }))}><Eye size={16} /><span><strong>Publish</strong><small>Show it in this browser’s storefront</small></span>{form.status === 'published' && <Check size={16} />}</button>
                    </div>
                  </section>
                </div>
                <aside className="admin-editor-aside">
                  <section className="admin-panel admin-preview-card">
                    <div className="admin-panel-heading"><div><h2>Live preview</h2><p>A quick look at your product.</p></div><span className="admin-step"><Eye size={15} /></span></div>
                    <div className="admin-preview-image">{form.imageUrl ? <img src={form.imageUrl} alt="" /> : <ImagePlus size={26} />}</div>
                    <span className="admin-product-category">{form.category}</span>
                    <h3>{form.name || 'Your product name'}</h3>
                    <p className="admin-preview-price">{form.price ? formatPrice(Number(form.price) || 0) : '₹—'}</p>
                    <p className="admin-product-description">{form.description || 'Your product description will appear here.'}</p>
                    <button type="button" className="admin-secondary-button admin-preview-button" onClick={() => setPreviewOpen(true)}><Eye size={15} /> View larger preview</button>
                  </section>
                  <div className="admin-storage-note"><ShieldCheck size={16} /><p>Saved in IndexedDB on this device only. Published products will not automatically appear on other visitors’ devices.</p></div>
                  <div className="admin-editor-actions">
                    <button type="button" className="admin-secondary-button" onClick={() => setPreviewOpen(true)}><Eye size={15} /> Preview</button>
                    <button type="button" className="admin-primary-button" disabled={saving} onClick={() => void saveProduct(form.status)}>{saving ? 'Saving…' : form.status === 'published' ? 'Save & publish' : 'Save draft'} <ArrowUpRight size={15} /></button>
                  </div>
                </aside>
              </form>
            )}
          </section>
        )}
      </main>

      {previewOpen && (
        <div className="admin-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setPreviewOpen(false); }}>
          <section className="admin-preview-modal" role="dialog" aria-modal="true" aria-labelledby="admin-preview-title">
            <button type="button" aria-label="Close preview" className="admin-modal-close" onClick={() => setPreviewOpen(false)}><X size={19} /></button>
            {form.imageUrl ? <img src={form.imageUrl} alt={form.name || 'Product preview'} /> : <div className="admin-modal-image-placeholder"><ImagePlus size={30} /> Image needed</div>}
            <div className="admin-modal-copy"><span className="admin-product-category">{form.category}</span><h2 id="admin-preview-title">{form.name || 'Your product name'}</h2><strong>{form.price ? formatPrice(Number(form.price) || 0) : '₹—'}</strong><p>{form.description || 'Your product description will appear here.'}</p><span className={`admin-status is-${form.status}`}>{form.status}</span></div>
          </section>
        </div>
      )}
    </div>
  );
}
