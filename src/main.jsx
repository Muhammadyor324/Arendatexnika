import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight, ArrowUpRight, BarChart3, Bell, Bookmark, Building2, CalendarCheck2,
  CalendarDays, Check, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight,
  CircleDollarSign, Clock3, Copy, CreditCard, Edit3, Eye, Filter, Globe2,
  HardHat, Heart, ImagePlus, Info, LayoutDashboard, ListFilter, LockKeyhole,
  Mail, MapPin, Menu, MessageCircle, MoreHorizontal, Package, Phone, Plus,
  Search, Send, Settings, ShieldCheck, SlidersHorizontal, Sparkles, Star,
  Trash2, Truck, UploadCloud, UserCircle, Users, WalletCards, Wrench, X, Zap
} from 'lucide-react';
import './styles.css';

const imageBase = 'https://images.unsplash.com';
const equipmentSeed = [
  {
    id: 1, name: 'Kobelco SK 210', category: 'Ekskavator', location: 'Toshkent shahri', price: 1850000,
    rating: 4.9, reviews: 18, year: 2022, power: '118 kW', capacity: '0.93 m³', owner: 'Azizbek Qurbonov', ownerAvatar: 'AQ',
    image: `${imageBase}/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1200&q=85`,
    gallery: [`${imageBase}/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1400&q=85`, `${imageBase}/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=900&q=85`],
    verified: true, featured: true, description: 'Yuqori unumdorlikka ega, yaxshi saqlangan va operator bilan taqdim etiladigan universal ekskavator. Qurilish va qazish ishlari uchun ideal.'
  },
  {
    id: 2, name: 'XCMG XCT25 krani', category: 'Kran', location: 'Toshkent viloyati', price: 3200000,
    rating: 4.8, reviews: 12, year: 2021, power: '213 kW', capacity: '25 tonna', owner: 'Sardor Mamatov', ownerAvatar: 'SM',
    image: `${imageBase}/photo-1516939884455-1445c8652f83?auto=format&fit=crop&w=1200&q=85`,
    gallery: [`${imageBase}/photo-1516939884455-1445c8652f83?auto=format&fit=crop&w=1400&q=85`, `${imageBase}/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=85`],
    verified: true, featured: true, description: 'Shahar va sanoat qurilishlari uchun ixcham, manevrli avtokranda barcha texnik ko‘riklar o‘tkazilgan.'
  },
  {
    id: 3, name: 'Howo A7 371 samosval', category: 'Samosval', location: 'Samarqand shahri', price: 1450000,
    rating: 4.7, reviews: 26, year: 2020, power: '336 kW', capacity: '25 m³', owner: 'Bekzod Transport', ownerAvatar: 'BT',
    image: `${imageBase}/photo-1586191582151-9a4e3f7d7c1f?auto=format&fit=crop&w=1200&q=85`,
    gallery: [`${imageBase}/photo-1586191582151-9a4e3f7d7c1f?auto=format&fit=crop&w=1400&q=85`],
    verified: true, featured: true, description: 'Qurilish chiqindilari va inert materiallarni tashish uchun katta hajmli samosval.'
  },
  {
    id: 4, name: 'Shantui SD16 buldozer', category: 'Buldozer', location: 'Farg‘ona viloyati', price: 2100000,
    rating: 4.9, reviews: 9, year: 2023, power: '131 kW', capacity: '4.5 m³', owner: 'Farrux Aliyev', ownerAvatar: 'FA',
    image: `${imageBase}/photo-1565610222536-ef125c59da2e?auto=format&fit=crop&w=1200&q=85`,
    gallery: [`${imageBase}/photo-1565610222536-ef125c59da2e?auto=format&fit=crop&w=1400&q=85`],
    verified: true, featured: false, description: 'Yangi avlod Shantui buldozeri. Yer tekislash, surish va yo‘l qurilishi loyihalari uchun mos.'
  },
  {
    id: 5, name: 'JCB 3CX Backhoe Loader', category: 'Maxsus texnika', location: 'Toshkent shahri', price: 1650000,
    rating: 4.6, reviews: 14, year: 2021, power: '74 kW', capacity: '1.0 m³', owner: 'ProRent Group', ownerAvatar: 'PG',
    image: `${imageBase}/photo-1590644365607-1c5a9c9e6f6a?auto=format&fit=crop&w=1200&q=85`,
    gallery: [`${imageBase}/photo-1590644365607-1c5a9c9e6f6a?auto=format&fit=crop&w=1400&q=85`],
    verified: true, featured: false, description: 'Bir texnikada ikkita imkoniyat: old kovsh va orqa ekskavator. Kichik va o‘rta loyihalar uchun.'
  },
  {
    id: 6, name: 'CAT DE110E0 generator', category: 'Generator', location: 'Andijon shahri', price: 980000,
    rating: 4.8, reviews: 7, year: 2022, power: '88 kW', capacity: '110 kVA', owner: 'Energo Rent', ownerAvatar: 'ER',
    image: `${imageBase}/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=85`,
    gallery: [`${imageBase}/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1400&q=85`],
    verified: false, featured: false, description: 'Jim ishlaydigan, tejamkor dizel generator. Qurilish maydonchasida uzluksiz elektr ta’minoti uchun.'
  }
];

const categories = [
  { name: 'Ekskavatorlar', short: 'Ekskavator', count: '124 ta', color: 'sand', icon: '⛏' },
  { name: 'Kranlar', short: 'Kran', count: '48 ta', color: 'blue', icon: '🏗' },
  { name: 'Samosvallar', short: 'Samosval', count: '86 ta', color: 'orange', icon: '🚚' },
  { name: 'Buldozerlar', short: 'Buldozer', count: '32 ta', color: 'green', icon: '▰' },
  { name: 'Generatorlar', short: 'Generator', count: '57 ta', color: 'purple', icon: '⚡' },
  { name: 'Boshqa texnika', short: 'Maxsus texnika', count: '73 ta', color: 'gray', icon: '⚙' }
];

const initialBookings = [
  { id: 'AT-2048', equipment: equipmentSeed[1], start: '2026-09-18', end: '2026-09-20', days: 3, total: 9600000, status: 'Tasdiqlandi', payment: 'Payme' },
  { id: 'AT-1994', equipment: equipmentSeed[2], start: '2026-08-05', end: '2026-08-07', days: 3, total: 4350000, status: 'Yakunlandi', payment: 'Naqd' }
];

const formatPrice = (price) => `${new Intl.NumberFormat('uz-UZ').format(price)} so'm`;
const shortPrice = (price) => price >= 1000000 ? `${(price / 1000000).toFixed(1).replace('.0', '')} mln` : `${Math.round(price / 1000)} ming`;
const calculateDays = (start, end) => {
  if (!start || !end) return 1;
  const diff = (new Date(`${end}T00:00:00`) - new Date(`${start}T00:00:00`)) / 86400000;
  return Math.max(1, Math.floor(diff) + 1);
};

function App() {
  const [page, setPage] = useState('home');
  const [equipment, setEquipment] = useState(equipmentSeed);
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState('');
  const [searchDraft, setSearchDraft] = useState('');
  const [category, setCategory] = useState('Barchasi');
  const [location, setLocation] = useState('');
  const [maxPrice, setMaxPrice] = useState(5000000);
  const [favorites, setFavorites] = useState(new Set([2]));
  const [bookings, setBookings] = useState(initialBookings);
  const [toast, setToast] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [listingOpen, setListingOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [lang, setLang] = useState('UZ');

  const selectedEquipment = equipment.find((item) => item.id === selectedId) || equipment[0];
  const filteredEquipment = useMemo(() => equipment.filter((item) => {
    const matchesText = !search || `${item.name} ${item.category} ${item.location}`.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'Barchasi' || item.category === category;
    const matchesLocation = !location || item.location.toLowerCase().includes(location.toLowerCase());
    const matchesPrice = item.price <= maxPrice;
    const matchesFavorite = !favoritesOnly || favorites.has(item.id);
    return matchesText && matchesCategory && matchesLocation && matchesPrice && matchesFavorite;
  }), [equipment, search, category, location, maxPrice, favoritesOnly, favorites]);

  useEffect(() => {
    if (!toast) return undefined;
    const timeout = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(timeout);
  }, [toast]);

  const notify = (message, type = 'success') => setToast({ message, type });
  const goTo = (nextPage) => {
    setPage(nextPage);
    setMobileMenuOpen(false);
    setNotificationsOpen(false);
    setUserMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const openDetail = (id) => { setSelectedId(id); goTo('detail'); };
  const toggleFavorite = (id) => {
    setFavorites((current) => {
      const next = new Set(current);
      if (next.has(id)) { next.delete(id); notify('Sevimlilardan olib tashlandi'); }
      else { next.add(id); notify('Texnika sevimlilarga saqlandi'); }
      return next;
    });
  };
  const submitSearch = (event) => {
    event?.preventDefault();
    setSearch(searchDraft.trim());
    setFavoritesOnly(false);
    goTo('catalog');
  };
  const chooseCategory = (value) => {
    setCategory(value);
    setSearch('');
    setSearchDraft('');
    setFavoritesOnly(false);
    goTo('catalog');
  };
  const openFavorites = () => {
    setFavoritesOnly(true);
    setCategory('Barchasi');
    setSearch('');
    goTo('catalog');
  };
  const createBooking = (details) => {
    const booking = {
      id: `AT-${Math.floor(2000 + Math.random() * 7000)}`,
      equipment: selectedEquipment, ...details, status: 'Kutilmoqda'
    };
    setBookings((current) => [booking, ...current]);
    setBookingOpen(false);
    notify('So‘rovingiz egasiga yuborildi. Tez orada javob keladi.');
    goTo('dashboard');
  };
  const addListing = (form) => {
    const newItem = {
      id: Date.now(), name: form.name, category: form.category, location: form.location,
      price: Number(form.price), rating: 0, reviews: 0, year: Number(form.year) || 2024,
      power: form.power || '—', capacity: form.capacity || '—', owner: 'Murod Karimov', ownerAvatar: 'MK', verified: false,
      featured: false, description: form.description || 'Yangi e’lon qilingan qurilish texnikasi.',
      image: form.image || `${imageBase}/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=85`,
      gallery: [form.image || `${imageBase}/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=85`]
    };
    setEquipment((current) => [newItem, ...current]);
    setListingOpen(false);
    notify('E’loningiz moderatsiyaga yuborildi.');
    goTo('dashboard');
  };

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="header-inner">
          <button className="brand" onClick={() => goTo('home')} aria-label="ArendaTexnika bosh sahifa">
            <span className="brand-mark"><HardHat size={21} strokeWidth={2.4} /></span>
            <span><strong>Arenda</strong><em>Texnika</em></span>
          </button>
          <nav className={`main-nav ${mobileMenuOpen ? 'is-open' : ''}`}>
            <button className={page === 'home' ? 'active' : ''} onClick={() => goTo('home')}>Bosh sahifa</button>
            <button className={page === 'catalog' || page === 'detail' ? 'active' : ''} onClick={() => goTo('catalog')}>Katalog</button>
            <button onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}>Qanday ishlaydi?</button>
            <button onClick={() => notify('Yordam markazi tez orada ishga tushadi.')}>Yordam</button>
          </nav>
          <div className="header-actions">
            <button className="language-button" onClick={() => { setLang(lang === 'UZ' ? 'RU' : lang === 'RU' ? 'EN' : 'UZ'); notify(`Til: ${lang === 'UZ' ? 'Русский' : lang === 'RU' ? 'English' : 'O‘zbekcha'}`); }}><Globe2 size={16} /> {lang}<ChevronDown size={13} /></button>
            <button className="icon-button desktop-only" onClick={openFavorites} aria-label="Sevimlilar"><Heart size={19} /></button>
            <div className="popover-anchor">
              <button className="icon-button" onClick={() => { setNotificationsOpen(!notificationsOpen); setUserMenuOpen(false); }} aria-label="Bildirishnomalar"><Bell size={19} /><span className="notification-dot" /></button>
              {notificationsOpen && <NotificationPopover />}
            </div>
            <div className="user-area">
              <button className="user-chip" onClick={() => { setUserMenuOpen(!userMenuOpen); setNotificationsOpen(false); }}>
                <span className="avatar avatar-small">MK</span><span className="user-chip-name">Murod Karimov</span><ChevronDown size={14} />
              </button>
              {userMenuOpen && <UserPopover goTo={goTo} openAuth={() => setAuthOpen(true)} />}
            </div>
            <button className="mobile-menu-button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menyu">{mobileMenuOpen ? <X /> : <Menu />}</button>
          </div>
        </div>
      </header>

      <main>
        {page === 'home' && <Home searchDraft={searchDraft} setSearchDraft={setSearchDraft} submitSearch={submitSearch} chooseCategory={chooseCategory} openDetail={openDetail} toggleFavorite={toggleFavorite} favorites={favorites} setListingOpen={setListingOpen} goTo={goTo} />}
        {page === 'catalog' && <Catalog items={filteredEquipment} searchDraft={searchDraft} setSearchDraft={setSearchDraft} submitSearch={submitSearch} category={category} setCategory={(value) => { setCategory(value); setFavoritesOnly(false); }} location={location} setLocation={setLocation} maxPrice={maxPrice} setMaxPrice={setMaxPrice} favorites={favorites} toggleFavorite={toggleFavorite} openDetail={openDetail} favoritesOnly={favoritesOnly} setFavoritesOnly={setFavoritesOnly} />}
        {page === 'detail' && <Detail item={selectedEquipment} isFavorite={favorites.has(selectedEquipment.id)} toggleFavorite={toggleFavorite} goTo={goTo} setBookingOpen={setBookingOpen} createBooking={createBooking} notify={notify} />}
        {page === 'dashboard' && <Dashboard bookings={bookings} equipment={equipment} goTo={goTo} setListingOpen={setListingOpen} notify={notify} />}
        {page === 'admin' && <Admin equipment={equipment} bookings={bookings} notify={notify} />}
      </main>

      {page !== 'admin' && <Footer goTo={goTo} />}
      {bookingOpen && <BookingModal item={selectedEquipment} close={() => setBookingOpen(false)} confirm={createBooking} />}
      {listingOpen && <ListingModal close={() => setListingOpen(false)} submit={addListing} />}
      {authOpen && <AuthModal close={() => setAuthOpen(false)} notify={notify} />}
      {toast && <div className={`toast ${toast.type}`}><span className="toast-icon"><Check size={16} /></span>{toast.message}<button onClick={() => setToast(null)}><X size={15} /></button></div>}
    </div>
  );
}

function NotificationPopover() {
  return <div className="popover notification-popover">
    <div className="popover-heading"><strong>Bildirishnomalar</strong><button>Hammasini o‘qilgan</button></div>
    <div className="notification-item"><span className="notification-icon green"><CheckCircle2 size={16} /></span><span><b>Bandlov tasdiqlandi</b><small>XCMG XCT25 krani • 18–20 sentabr</small><time>12 daqiqa oldin</time></span></div>
    <div className="notification-item"><span className="notification-icon orange"><MessageCircle size={16} /></span><span><b>Yangi xabar</b><small>Sardor Mamatov sizga yozdi</small><time>1 soat oldin</time></span></div>
    <div className="popover-footer">Barcha bildirishnomalar <ArrowRight size={14} /></div>
  </div>;
}

function UserPopover({ goTo, openAuth }) {
  return <div className="popover user-popover">
    <div className="popover-user"><span className="avatar">MK</span><span><strong>Murod Karimov</strong><small>Ijarachi va egasi</small></span></div>
    <button onClick={() => goTo('dashboard')}><LayoutDashboard size={16} /> Kabinetim</button>
    <button onClick={() => goTo('dashboard')}><Heart size={16} /> Sevimlilarim</button>
    <button onClick={() => goTo('admin')}><BarChart3 size={16} /> Admin panel <span className="menu-badge">demo</span></button>
    <button onClick={() => openAuth()}><Settings size={16} /> Profil sozlamalari</button>
    <div className="popover-divider" />
    <button className="logout"><LockKeyhole size={16} /> Chiqish</button>
  </div>;
}

function Home({ searchDraft, setSearchDraft, submitSearch, chooseCategory, openDetail, toggleFavorite, favorites, setListingOpen, goTo }) {
  return <>
    <section className="hero-section">
      <div className="hero-noise" />
      <div className="hero-inner page-width">
        <div className="hero-copy">
          <div className="eyebrow light"><span className="pulse-dot" /> O‘zbekistondagi #1 texnika marketplace</div>
          <h1>Qurilish ishingizga<br /><span>to‘g‘ri texnika.</span></h1>
          <p>Kerakli texnikani toping, sanalarni belgilang va loyihangizni kechiktirmang. Ishonchli egalar, aniq narxlar.</p>
          <div className="hero-proof"><span className="proof-avatars"><i>AS</i><i>BK</i><i>NM</i><i>+</i></span><span><strong>2,400+</strong> foydalanuvchi allaqachon tanladi</span></div>
        </div>
        <form className="search-panel" onSubmit={submitSearch}>
          <div className="search-panel-title"><span><Search size={17} /> Texnika qidirish</span><small>1,200+ e’lon ichidan</small></div>
          <label className="search-field"><span className="field-icon"><Search size={18} /></span><span><small>Texnika turi</small><input value={searchDraft} onChange={(e) => setSearchDraft(e.target.value)} placeholder="Masalan, ekskavator" /></span></label>
          <div className="search-row">
            <label className="search-field compact"><span className="field-icon"><MapPin size={18} /></span><span><small>Joylashuv</small><input placeholder="Viloyat yoki shahar" /></span></label>
            <label className="search-field compact"><span className="field-icon"><CalendarDays size={18} /></span><span><small>Sana</small><input placeholder="Qachon kerak?" /></span></label>
          </div>
          <button className="primary-button search-submit" type="submit">Qidirishni boshlash <ArrowRight size={17} /></button>
          <div className="search-foot"><ShieldCheck size={15} /> Barcha egalar tasdiqlangan</div>
        </form>
      </div>
      <div className="hero-bottom-glow" />
    </section>

    <section className="page-width trust-strip">
      <div><strong>1,200+</strong><span>Faol texnika</span></div><div><strong>24</strong><span>Viloyatda xizmat</span></div><div><strong>4.9/5</strong><span>O‘rtacha reyting</span></div><div><strong>98%</strong><span>Mamnun mijozlar</span></div>
      <div className="trust-note"><ShieldCheck size={20} /><span><b>Tekshirilgan hamjamiyat</b><small>Har bir e’lon nazoratdan o‘tadi</small></span></div>
    </section>

    <section className="page-width section-block categories-section">
      <div className="section-heading"><div><span className="eyebrow">Kategoriyalar</span><h2>Qaysi texnika kerak?</h2></div><button className="text-button" onClick={() => goTo('catalog')}>Barchasini ko‘rish <ArrowRight size={16} /></button></div>
      <div className="category-grid">{categories.map((item) => <button className="category-card" key={item.name} onClick={() => chooseCategory(item.short)}><span className={`category-art ${item.color}`}>{item.icon}</span><span className="category-content"><strong>{item.name}</strong><small>{item.count}</small></span><ArrowUpRight size={17} className="category-arrow" /></button>)}</div>
    </section>

    <section className="page-width section-block featured-section">
      <div className="section-heading"><div><span className="eyebrow">Bugun ommabop</span><h2>Tavsiya etilgan texnikalar</h2><p className="section-description">Loyihalar uchun eng ko‘p tanlanayotgan, ishonchli texnikalar.</p></div><button className="outline-button" onClick={() => goTo('catalog')}>Katalogni ko‘rish <ArrowRight size={16} /></button></div>
      <div className="equipment-grid">{equipmentSeed.slice(0, 3).map((item) => <EquipmentCard key={item.id} item={item} isFavorite={favorites.has(item.id)} onFavorite={() => toggleFavorite(item.id)} onClick={() => openDetail(item.id)} />)}</div>
    </section>

    <section className="how-section" id="how-it-works">
      <div className="page-width"><div className="section-heading centered"><div><span className="eyebrow">Oddiy va qulay</span><h2>3 qadamda texnika tayyor</h2><p className="section-description">Qidirishdan ishni boshlashgacha — hammasi bitta joyda.</p></div></div>
        <div className="steps-grid"><div className="step-card"><span className="step-number">01</span><span className="step-icon"><Search size={22} /></span><h3>Qidiring</h3><p>Texnika turi, joylashuvi va sanani belgilang. O‘zingizga mos variantni toping.</p></div><div className="step-line" /><div className="step-card"><span className="step-number">02</span><span className="step-icon"><CalendarCheck2 size={22} /></span><h3>Band qiling</h3><p>Bo‘sh sanalarni tanlang va egaga band qilish so‘rovini yuboring.</p></div><div className="step-line" /><div className="step-card"><span className="step-number">03</span><span className="step-icon"><Truck size={22} /></span><h3>Ishni boshlang</h3><p>Kelishilgan manzilda texnikani qabul qiling va loyihangizni boshlang.</p></div></div>
      </div>
    </section>

    <section className="page-width owner-banner"><div className="owner-banner-copy"><span className="eyebrow">Sizda texnika bormi?</span><h2>Texnikangiz bekor<br />turmasin.</h2><p>E’lon joylang, minglab mijozlarga yetib boring va daromad oling.</p><button className="dark-button" onClick={() => setListingOpen(true)}>E’lon joylash <Plus size={17} /></button></div><div className="owner-banner-graphic"><div className="graphic-circle" /><div className="graphic-card card-back" /><div className="graphic-card card-front"><span className="mini-label">OYLIK DAROMAD</span><strong>+ 18.4 mln</strong><div className="mini-chart"><i /><i /><i /><i /><i /><i /><i /></div></div><span className="graphic-spark">✦</span></div></section>
  </>;
}

function EquipmentCard({ item, isFavorite, onFavorite, onClick }) {
  return <article className="equipment-card" onClick={onClick}>
    <div className="equipment-image-wrap"><img src={item.image} alt={item.name} /><div className="image-overlay" />{item.featured && <span className="featured-badge"><Sparkles size={12} /> Tavsiya</span>}<button className={`favorite-button ${isFavorite ? 'selected' : ''}`} onClick={(event) => { event.stopPropagation(); onFavorite(); }} aria-label="Sevimliga qo‘shish"><Heart size={17} fill={isFavorite ? 'currentColor' : 'none'} /></button><span className="availability-badge"><i /> Bo‘sh</span></div>
    <div className="equipment-card-body"><div className="card-meta"><span>{item.category}</span><span className="rating"><Star size={13} fill="currentColor" /> {item.rating || 'Yangi'} {item.reviews ? `(${item.reviews})` : ''}</span></div><h3>{item.name}</h3><div className="card-location"><MapPin size={14} /> {item.location}</div><div className="card-footer"><span><b>{formatPrice(item.price)}</b><small>/ kuniga</small></span><button className="card-action" onClick={(event) => { event.stopPropagation(); onClick(); }}>Ko‘rish <ArrowUpRight size={15} /></button></div></div>
  </article>;
}

function Catalog({ items, searchDraft, setSearchDraft, submitSearch, category, setCategory, location, setLocation, maxPrice, setMaxPrice, favorites, toggleFavorite, openDetail, favoritesOnly, setFavoritesOnly }) {
  const [mobileFilters, setMobileFilters] = useState(false);
  const [sort, setSort] = useState('Tavsiya etilgan');
  const sortedItems = [...items].sort((a, b) => sort === 'Arzonroq' ? a.price - b.price : sort === 'Reytingi yuqori' ? b.rating - a.rating : 0);
  return <section className="catalog-page page-width">
    <div className="breadcrumbs"><button onClick={() => window.scrollTo({ top: 0 })}>Bosh sahifa</button><ChevronRight size={14} /><span>Katalog</span></div>
    <div className="catalog-heading"><div><span className="eyebrow">Barcha e’lonlar</span><h1>O‘zingizga mos texnikani toping</h1><p>{items.length} ta natija sizning qidiruvingiz bo‘yicha</p></div><button className="filter-toggle-button" onClick={() => setMobileFilters(!mobileFilters)}><SlidersHorizontal size={17} /> Filtrlar</button></div>
    <div className="catalog-searchbar"><form onSubmit={submitSearch}><Search size={18} /><input value={searchDraft} onChange={(e) => setSearchDraft(e.target.value)} placeholder="Texnika nomi yoki turi bo‘yicha qidiring" /><button type="submit">Qidirish</button></form><label><MapPin size={17} /><input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Joylashuv" /></label><label><CalendarDays size={17} /><span>Sanani tanlang</span><ChevronDown size={14} /></label></div>
    <div className="catalog-layout">
      <aside className={`filter-sidebar ${mobileFilters ? 'mobile-open' : ''}`}><div className="filter-header"><strong>Filtrlar</strong><button onClick={() => { setCategory('Barchasi'); setLocation(''); setMaxPrice(5000000); setFavoritesOnly(false); }}>Tozalash</button><button className="filter-close" onClick={() => setMobileFilters(false)}><X size={18} /></button></div>
        <FilterGroup title="Texnika turi"><label className="radio-row"><input type="radio" checked={category === 'Barchasi'} onChange={() => setCategory('Barchasi')} /><span className="fake-radio" /> Barchasi <small>420</small></label>{categories.slice(0, 5).map((item) => <label className="radio-row" key={item.short}><input type="radio" checked={category === item.short} onChange={() => setCategory(item.short)} /><span className="fake-radio" /> {item.short}{item.short === 'Ekskavator' ? 'lar' : 'lar'} <small>{item.count.replace(' ta', '')}</small></label>)}</FilterGroup>
        <FilterGroup title="Narx oralig‘i"><div className="price-range-values"><span>0 so‘m</span><b>{shortPrice(maxPrice)}</b></div><input className="range-input" type="range" min="500000" max="5000000" step="100000" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} /><div className="range-labels"><span>500 ming</span><span>5 mln+</span></div></FilterGroup>
        <FilterGroup title="Joylashuv"><label className="select-field"><MapPin size={16} /><select value={location} onChange={(e) => setLocation(e.target.value)}><option value="">Barcha hududlar</option><option>Toshkent shahri</option><option>Toshkent viloyati</option><option>Samarqand shahri</option><option>Farg‘ona viloyati</option><option>Andijon shahri</option></select><ChevronDown size={14} /></label></FilterGroup>
        <FilterGroup title="Qo‘shimcha"><label className="check-row"><input type="checkbox" /> <span className="fake-check"><Check size={12} /></span> Faqat tasdiqlanganlar</label><label className="check-row"><input type="checkbox" /> <span className="fake-check"><Check size={12} /></span> Operator bilan</label><label className="check-row"><input type="checkbox" /> <span className="fake-check"><Check size={12} /></span> Yetkazib berish</label></FilterGroup>
      </aside>
      <div className="catalog-results"><div className="results-toolbar"><label className="favorites-filter"><input type="checkbox" checked={favoritesOnly} onChange={(e) => setFavoritesOnly(e.target.checked)} /><Heart size={15} fill={favoritesOnly ? 'currentColor' : 'none'} /> Sevimlilarim</label><div className="sort-select"><span>Saralash:</span><select value={sort} onChange={(e) => setSort(e.target.value)}><option>Tavsiya etilgan</option><option>Arzonroq</option><option>Reytingi yuqori</option></select><ChevronDown size={14} /></div></div>{sortedItems.length ? <div className="equipment-grid">{sortedItems.map((item) => <EquipmentCard key={item.id} item={item} isFavorite={favorites.has(item.id)} onFavorite={() => toggleFavorite(item.id)} onClick={() => openDetail(item.id)} />)}</div> : <EmptyResults clear={() => { setCategory('Barchasi'); setLocation(''); setMaxPrice(5000000); setFavoritesOnly(false); }} />}</div>
    </div>
  </section>;
}

function FilterGroup({ title, children }) { return <div className="filter-group"><h4>{title}</h4>{children}</div>; }
function EmptyResults({ clear }) { return <div className="empty-results"><span><Search size={23} /></span><h3>Hech narsa topilmadi</h3><p>Filtrlarni o‘zgartirib ko‘ring yoki boshqa qidiruv so‘zidan foydalaning.</p><button className="outline-button" onClick={clear}>Filtrlarni tozalash</button></div>; }

function Detail({ item, isFavorite, toggleFavorite, goTo, setBookingOpen, createBooking, notify }) {
  const [activeImage, setActiveImage] = useState(0);
  const [start, setStart] = useState('2026-09-16');
  const [end, setEnd] = useState('2026-09-18');
  const days = calculateDays(start, end);
  const total = days * item.price;
  return <section className="detail-page page-width"><div className="breadcrumbs"><button onClick={() => goTo('catalog')}>Katalog</button><ChevronRight size={14} /><span>{item.category}</span><ChevronRight size={14} /><span>{item.name}</span></div>
    <button className="back-button" onClick={() => goTo('catalog')}><ChevronLeft size={17} /> Katalogga qaytish</button>
    <div className="detail-layout"><div className="detail-main"><div className="gallery"><div className="gallery-main"><img src={item.gallery?.[activeImage] || item.image} alt={item.name} /><span className="gallery-count"><ImagePlus size={14} /> {item.gallery?.length || 1} rasm</span><button className="gallery-next" onClick={() => setActiveImage((activeImage + 1) % (item.gallery?.length || 1))}><ChevronRight size={20} /></button></div><div className="gallery-thumbs">{(item.gallery || [item.image]).map((src, index) => <button key={src} className={activeImage === index ? 'active' : ''} onClick={() => setActiveImage(index)}><img src={src} alt="" /></button>)}<button className="video-thumb"><span><Zap size={17} /></span><small>Video ko‘rish</small></button></div></div>
      <div className="detail-title-row"><div><div className="detail-labels"><span className="status-pill"><i /> Hozir bo‘sh</span>{item.verified && <span className="verified-pill"><ShieldCheck size={13} /> Tasdiqlangan</span>}</div><h1>{item.name}</h1><div className="detail-meta"><span><MapPin size={16} /> {item.location}</span><span className="rating"><Star size={15} fill="currentColor" /> {item.rating} <u>{item.reviews} ta sharh</u></span></div></div><button className={`detail-favorite ${isFavorite ? 'selected' : ''}`} onClick={() => toggleFavorite(item.id)}><Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} /> {isFavorite ? 'Saqlangan' : 'Saqlash'}</button></div>
      <p className="detail-description">{item.description}</p>
      <div className="spec-grid"><Spec icon="calendar" label="Ishlab chiqarilgan" value={`${item.year}-yil`} /><Spec icon="power" label="Quvvati" value={item.power} /><Spec icon="capacity" label="Hajmi" value={item.capacity} /><Spec icon="truck" label="Yetkazib berish" value="Kelishiladi" /></div>
      <div className="detail-divider" /><section className="owner-section"><div className="subsection-heading"><div><span className="eyebrow">Texnika egasi</span><h2>Egasi haqida</h2></div><button className="text-button" onClick={() => notify('Egaga xabar yuborish oynasi tez orada.')}>Xabar yozish <MessageCircle size={15} /></button></div><div className="owner-card"><span className="avatar avatar-large">{item.ownerAvatar}</span><span className="owner-info"><strong>{item.owner}</strong><small><ShieldCheck size={13} /> Tasdiqlangan egasi · 2021-yildan beri</small></span><span className="owner-stats"><b><Star size={14} fill="currentColor" /> 4.9</b><small>18 ta sharh</small></span><ArrowRight size={17} /></div></section>
      <section className="location-section"><div className="subsection-heading"><div><span className="eyebrow">Joylashuv</span><h2>Texnika qayerda?</h2></div><button className="text-button" onClick={() => notify('Xarita yangi oynada ochiladi.')}>Xaritada ko‘rish <ArrowUpRight size={15} /></button></div><div className="map-preview"><div className="map-roads"><i /><i /><i /><i /><i /><span className="map-pin"><MapPin size={19} /></span></div><div className="map-label"><span><MapPin size={15} /><b>{item.location}</b></span><small>Aniq manzil bandlov tasdiqlangandan so‘ng beriladi</small></div></div></section>\n      <section className="reviews-section"><div className="subsection-heading"><div><span className="eyebrow">Mijozlar fikri</span><h2>So‘nggi sharhlar <small>(18)</small></h2></div><button className="text-button">Barchasini ko‘rish <ArrowRight size={15} /></button></div><div className="review-grid"><Review initials="DS" name="Diyorbek S." date="2 kun oldin" text="Texnika holati rasmlardagidan ham yaxshi ekan. Egasi vaqtida olib keldi, operator ham juda tajribali." rating="5.0" /><Review initials="MA" name="Madina A." date="1 hafta oldin" text="Juda qulay servis. Bron qilish tez bo‘ldi, kelishilgan narxda hech qanday qo‘shimcha to‘lov bo‘lmadi." rating="4.8" /></div></section>
    </div><aside className="booking-card"><div className="booking-price"><span><b>{formatPrice(item.price)}</b><small>/ kuniga</small></span><span className="booking-rating"><Star size={15} fill="currentColor" /> {item.rating}</span></div><div className="booking-card-divider" /><div className="booking-form-title">Ijara muddatini tanlang</div><div className="date-inputs"><label><small>Boshlanish kuni</small><span><CalendarDays size={16} /><input type="date" value={start} onChange={(e) => setStart(e.target.value)} /></span></label><label><small>Tugash kuni</small><span><CalendarDays size={16} /><input type="date" value={end} min={start} onChange={(e) => setEnd(e.target.value)} /></span></label></div><div className="availability-calendar"><div className="calendar-top"><button><ChevronLeft size={15} /></button><strong>Sentabr 2026</strong><button><ChevronRight size={15} /></button></div><div className="calendar-week"><span>Du</span><span>Se</span><span>Cho</span><span>Pa</span><span>Ju</span><span>Sha</span><span>Ya</span></div><div className="calendar-days">{['31','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','1','2','3','4'].map((day, index) => <span key={`${day}-${index}`} className={`${index < 1 || index > 30 ? 'muted' : ''} ${['16','17','18'].includes(day) ? 'selected-day' : ''} ${['22','23'].includes(day) ? 'booked-day' : ''}`}>{day}</span>)}</div><div className="calendar-legend"><span><i className="selected-dot" /> Siz tanladingiz</span><span><i className="booked-dot" /> Band</span></div></div><div className="booking-summary"><span>{formatPrice(item.price)} × {days} kun</span><b>{formatPrice(total)}</b></div><p className="booking-note"><ShieldCheck size={14} /> To‘lov faqat egasi tasdiqlaganidan so‘ng amalga oshiriladi</p><button className="primary-button full-button" onClick={() => createBooking({ start, end, days, total, payment: 'Payme' })}>Band qilish <ArrowRight size={17} /></button><button className="secondary-button full-button" onClick={() => setBookingOpen(true)}>Batafsil so‘rov yuborish</button><div className="safe-note"><LockKeyhole size={13} /> Xavfsiz va ishonchli bron</div></aside></div>
  </section>;
}

function Spec({ icon, label, value }) { const Icon = icon === 'calendar' ? CalendarDays : icon === 'power' ? Zap : icon === 'capacity' ? Package : Truck; return <div className="spec-item"><span><Icon size={18} /></span><small>{label}</small><strong>{value}</strong></div>; }
function Review({ initials, name, date, text, rating }) { return <div className="review-card"><div className="review-head"><span className="avatar">{initials}</span><span><strong>{name}</strong><small>{date}</small></span><b><Star size={13} fill="currentColor" /> {rating}</b></div><p>“{text}”</p></div>; }

function BookingModal({ item, close, confirm }) {
  const [start, setStart] = useState('2026-09-16'); const [end, setEnd] = useState('2026-09-18'); const [payment, setPayment] = useState('Payme'); const days = calculateDays(start, end); const total = days * item.price;
  return <Modal close={close} title="Band qilish so‘rovi" subtitle="Ma’lumotlarni tekshirib, so‘rovni yuboring."><div className="modal-equipment"><img src={item.image} alt="" /><span><strong>{item.name}</strong><small><MapPin size={13} /> {item.location}</small></span><b>{formatPrice(item.price)}<small>/ kuniga</small></b></div><div className="modal-form-grid"><label>Qabul qilish sanasi<input type="date" value={start} onChange={(e) => setStart(e.target.value)} /></label><label>Qaytarish sanasi<input type="date" min={start} value={end} onChange={(e) => setEnd(e.target.value)} /></label></div><label className="modal-label">To‘lov usuli</label><div className="payment-options"><button className={payment === 'Payme' ? 'selected' : ''} onClick={() => setPayment('Payme')}><span className="payme-logo">P</span><span><b>Payme</b><small>To‘lov tasdiqdan keyin</small></span>{payment === 'Payme' && <CheckCircle2 size={17} />}</button><button className={payment === 'Click' ? 'selected' : ''} onClick={() => setPayment('Click')}><span className="click-logo">C</span><span><b>Click</b><small>To‘lov tasdiqdan keyin</small></span>{payment === 'Click' && <CheckCircle2 size={17} />}</button><button className={payment === 'Naqd' ? 'selected' : ''} onClick={() => setPayment('Naqd')}><span className="cash-logo"><WalletCards size={18} /></span><span><b>Naqd pul</b><small>Texnika egasi bilan kelishiladi</small></span>{payment === 'Naqd' && <CheckCircle2 size={17} />}</button></div><div className="modal-total"><span>Jami ({days} kun)</span><strong>{formatPrice(total)}</strong></div><button className="primary-button full-button" onClick={() => confirm({ start, end, days, total, payment })}>So‘rovni yuborish <ArrowRight size={17} /></button><p className="modal-terms">So‘rov yuborish orqali foydalanish shartlariga rozilik bildirasiz.</p></Modal>;
}

function ListingModal({ close, submit }) {
  const [form, setForm] = useState({ name: '', category: 'Ekskavator', location: 'Toshkent shahri', price: '', year: '2024', power: '', capacity: '', description: '' });
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  return <Modal close={close} title="Yangi e’lon joylash" subtitle="Texnikangiz haqida aniq ma’lumot bering — mijozlar tezroq topadi."><div className="listing-progress"><span className="active"><b>1</b> Asosiy ma’lumotlar</span><i /><span><b>2</b> Rasmlar</span><i /><span><b>3</b> Tekshirish</span></div><div className="modal-form-grid"><label>Texnika nomi *<input placeholder="Masalan, Komatsu PC210" value={form.name} onChange={(e) => update('name', e.target.value)} /></label><label>Kategoriya *<select value={form.category} onChange={(e) => update('category', e.target.value)}>{categories.slice(0, 5).map((item) => <option key={item.short}>{item.short}</option>)}</select></label><label>Joylashuv *<select value={form.location} onChange={(e) => update('location', e.target.value)}><option>Toshkent shahri</option><option>Toshkent viloyati</option><option>Samarqand shahri</option><option>Farg‘ona viloyati</option><option>Andijon shahri</option></select></label><label>Kunlik narx *<div className="input-with-suffix"><input type="number" placeholder="1 500 000" value={form.price} onChange={(e) => update('price', e.target.value)} /><span>so‘m</span></div></label><label>Ishlab chiqarilgan yil<input type="number" value={form.year} onChange={(e) => update('year', e.target.value)} /></label><label>Quvvati<input placeholder="Masalan, 118 kW" value={form.power} onChange={(e) => update('power', e.target.value)} /></label><label>Hajmi / yuk ko‘tarishi<input placeholder="Masalan, 0.93 m³" value={form.capacity} onChange={(e) => update('capacity', e.target.value)} /></label></div><label className="full-label">Qisqa tavsif<textarea rows="3" placeholder="Texnika holati, qanday ishlarga mosligi..." value={form.description} onChange={(e) => update('description', e.target.value)} /></label><div className="upload-zone"><UploadCloud size={23} /><strong>Rasm va videolarni shu yerga tashlang</strong><small>yoki <u>kompyuterdan tanlang</u> · JPG, PNG, MP4 · 10 MB gacha</small></div><div className="modal-actions"><button className="secondary-button" onClick={close}>Bekor qilish</button><button className="primary-button" disabled={!form.name || !form.price} onClick={() => submit(form)}>E’lonni davom ettirish <ArrowRight size={16} /></button></div></Modal>;
}

function AuthModal({ close, notify }) {
  const [tab, setTab] = useState('login');
  return <Modal close={close} title={tab === 'login' ? 'Xush kelibsiz' : 'Hisob yarating'} subtitle={tab === 'login' ? 'Kabinetga kirish uchun ma’lumotlaringizni kiriting.' : 'ArendaTexnika hamjamiyatiga qo‘shiling.'}><div className="auth-tabs"><button className={tab === 'login' ? 'active' : ''} onClick={() => setTab('login')}>Kirish</button><button className={tab === 'signup' ? 'active' : ''} onClick={() => setTab('signup')}>Ro‘yxatdan o‘tish</button></div><label className="full-label">Telefon raqami yoki email<input placeholder="+998 90 123 45 67" /></label>{tab === 'signup' && <label className="full-label">To‘liq ism<input placeholder="Ismingiz va familiyangiz" /></label>}<label className="full-label">Parol<div className="input-with-icon"><input type="password" placeholder="••••••••" /><LockKeyhole size={16} /></div></label>{tab === 'login' && <button className="forgot-link">Parolni unutdingizmi?</button>}<button className="primary-button full-button" onClick={() => { close(); notify(tab === 'login' ? 'Muvaffaqiyatli kirdingiz.' : 'Hisobingiz yaratildi.'); }}>Davom etish <ArrowRight size={17} /></button><div className="or-divider"><span>yoki</span></div><button className="google-button"><span>G</span> Google orqali davom etish</button><p className="modal-terms">Davom etish orqali foydalanish shartlari va maxfiylik siyosatiga rozilik bildirasiz.</p></Modal>;
}

function Modal({ close, title, subtitle, children }) { return <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}><div className="modal"><button className="modal-close" onClick={close}><X size={19} /></button><div className="modal-heading"><span className="modal-kicker"><Sparkles size={13} /> ArendaTexnika</span><h2>{title}</h2><p>{subtitle}</p></div>{children}</div></div>; }

function Dashboard({ bookings, equipment, goTo, setListingOpen, notify }) {
  const [tab, setTab] = useState('overview');
  const myListings = equipment.filter((item) => item.owner === 'Murod Karimov');
  return <section className="dashboard-page page-width"><div className="dashboard-welcome"><div><span className="eyebrow">12 sentabr, 2026 · Juma</span><h1>Xush kelibsiz, Murod <span>👋</span></h1><p>Loyihalaringiz va ijaralaringizni bir joydan boshqaring.</p></div><button className="primary-button" onClick={() => setListingOpen(true)}><Plus size={17} /> E’lon joylash</button></div><div className="dashboard-layout"><aside className="dashboard-sidebar"><div className="profile-mini"><span className="avatar avatar-large">MK</span><span><strong>Murod Karimov</strong><small>Ijarachi va egasi</small></span><button><MoreHorizontal size={17} /></button></div><nav className="dashboard-nav"><button className={tab === 'overview' ? 'active' : ''} onClick={() => setTab('overview')}><LayoutDashboard size={17} /> Umumiy ko‘rinish</button><button className={tab === 'listings' ? 'active' : ''} onClick={() => setTab('listings')}><Package size={17} /> Mening e’lonlarim <b>{myListings.length}</b></button><button className={tab === 'bookings' ? 'active' : ''} onClick={() => setTab('bookings')}><CalendarCheck2 size={17} /> Buyurtmalarim <b>{bookings.length}</b></button><button className={tab === 'messages' ? 'active' : ''} onClick={() => setTab('messages')}><MessageCircle size={17} /> Xabarlar <b className="green-count">3</b></button><button className={tab === 'payments' ? 'active' : ''} onClick={() => setTab('payments')}><WalletCards size={17} /> To‘lovlar tarixi</button></nav><div className="dashboard-sidebar-bottom"><button onClick={() => notify('Profil sozlamalari tez orada qo‘shiladi.')}><Settings size={17} /> Sozlamalar</button><button onClick={() => goTo('admin')}><BarChart3 size={17} /> Admin panel</button></div></aside><div className="dashboard-content">{tab === 'overview' && <DashboardOverview bookings={bookings} myListings={myListings} setTab={setTab} notify={notify} />}{tab === 'listings' && <ListingsTab listings={myListings} setListingOpen={setListingOpen} notify={notify} />}{tab === 'bookings' && <BookingsTab bookings={bookings} />}{tab === 'messages' && <MessagesTab />}{tab === 'payments' && <PaymentsTab bookings={bookings} />}</div></div></section>;
}

function DashboardOverview({ bookings, myListings, setTab, notify }) {
  return <><div className="dashboard-stat-grid"><StatCard icon={CalendarCheck2} color="blue" label="Faol ijaralar" value="2 ta" note="+1 bu oyda" /><StatCard icon={Package} color="orange" label="Faol e’lonlar" value={`${myListings.length || 0} ta`} note="Moderatsiyada 1 ta" /><StatCard icon={CircleDollarSign} color="green" label="Bu oydagi daromad" value="18.4 mln" note="+12.8% o‘tgan oyga" /><StatCard icon={Star} color="purple" label="O‘rtacha reyting" value="4.9" note="18 ta sharh" /></div><div className="dashboard-panels"><section className="panel-card activity-panel"><div className="panel-heading"><div><span className="eyebrow">So‘nggi faoliyat</span><h2>Buyurtmalar tarixi</h2></div><button className="text-button" onClick={() => setTab('bookings')}>Barchasini ko‘rish <ArrowRight size={15} /></button></div>{bookings.slice(0, 3).map((booking) => <BookingRow key={booking.id} booking={booking} />)}</section><section className="panel-card earnings-panel"><div className="panel-heading"><div><span className="eyebrow">Daromad</span><h2>Oylik ko‘rsatkich</h2></div><button className="icon-button light"><MoreHorizontal size={17} /></button></div><div className="earnings-total"><strong>18.4 mln <small>so‘m</small></strong><span className="positive"><ArrowUpRight size={14} /> 12.8%</span></div><MiniChart /><div className="chart-labels"><span>Apr</span><span>May</span><span>Iyun</span><span>Iyul</span><span>Avg</span><span>Sen</span></div></section></div><section className="panel-card quick-panel"><div className="panel-heading"><div><span className="eyebrow">Tezkor harakatlar</span><h2>Nima qilmoqchisiz?</h2></div></div><div className="quick-actions"><button onClick={() => setTab('listings')}><span className="quick-icon orange"><Plus size={19} /></span><span><b>Texnika qo‘shish</b><small>Yangi e’lon yarating</small></span><ArrowRight size={16} /></button><button onClick={() => notify('Katalog ochildi.')}><span className="quick-icon blue"><Search size={19} /></span><span><b>Texnika qidirish</b><small>Loyihangizga mosini toping</small></span><ArrowRight size={16} /></button><button onClick={() => setTab('messages')}><span className="quick-icon green"><MessageCircle size={19} /></span><span><b>Xabarlarni ko‘rish</b><small>3 ta o‘qilmagan xabar</small></span><ArrowRight size={16} /></button></div></section></>;
}
function StatCard({ icon: Icon, color, label, value, note }) { return <div className="stat-card"><span className={`stat-icon ${color}`}><Icon size={19} /></span><span className="stat-label">{label}</span><strong>{value}</strong><small className={note.startsWith('+') ? 'positive' : ''}>{note}</small></div>; }
function MiniChart() { return <div className="mini-chart-large"><svg viewBox="0 0 420 100" preserveAspectRatio="none"><defs><linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#89b9ae" stopOpacity=".35" /><stop offset="100%" stopColor="#89b9ae" stopOpacity="0" /></linearGradient></defs><path d="M0,78 C28,70 32,74 60,56 S100,75 126,60 S160,55 184,66 S218,46 244,48 S280,29 300,40 S340,24 360,30 S395,20 420,10 L420,100 L0,100 Z" fill="url(#chartGradient)" /><path d="M0,78 C28,70 32,74 60,56 S100,75 126,60 S160,55 184,66 S218,46 244,48 S280,29 300,40 S340,24 360,30 S395,20 420,10" fill="none" stroke="#438b7d" strokeWidth="3" strokeLinecap="round" /></svg></div>; }
function BookingRow({ booking }) { return <div className="booking-row"><img src={booking.equipment.image} alt="" /><span className="booking-row-info"><strong>{booking.equipment.name}</strong><small><CalendarDays size={13} /> {booking.start} — {booking.end}</small></span><span className={`status ${booking.status === 'Yakunlandi' ? 'done' : booking.status === 'Kutilmoqda' ? 'pending' : 'confirmed'}`}><i /> {booking.status}</span><b>{formatPrice(booking.total)}</b><button><MoreHorizontal size={17} /></button></div>; }
function ListingsTab({ listings, setListingOpen, notify }) { return <><div className="content-heading"><div><span className="eyebrow">Sizning texnikalaringiz</span><h2>Mening e’lonlarim</h2><p>Texnikalaringizni boshqaring va bandlovlarni kuzating.</p></div><button className="primary-button" onClick={() => setListingOpen(true)}><Plus size={17} /> E’lon joylash</button></div>{listings.length ? <div className="my-listings-table">{listings.map((item) => <div className="my-listing-row" key={item.id}><img src={item.image} alt="" /><span><strong>{item.name}</strong><small><MapPin size={13} /> {item.location}</small></span><b>{formatPrice(item.price)}<small>/ kuniga</small></b><span className="status confirmed"><i /> Faol</span><button onClick={() => notify('E’lon tahrirlash oynasi tez orada.')}><Edit3 size={16} /></button><button onClick={() => notify('E’lon menyusi')}><MoreHorizontal size={17} /></button></div>)}</div> : <div className="empty-dashboard"><Package size={28} /><h3>Hali e’lonlar yo‘q</h3><p>Texnikangizni joylang va ijaraga berishni boshlang.</p><button className="primary-button" onClick={() => setListingOpen(true)}><Plus size={16} /> Birinchi e’lonni joylash</button></div>}</>; }
function BookingsTab({ bookings }) { return <><div className="content-heading"><div><span className="eyebrow">Ijaralar</span><h2>Mening buyurtmalarim</h2><p>Barcha bandlovlar va ularning holati.</p></div><button className="outline-button"><Filter size={15} /> Filtrlash</button></div><div className="bookings-list">{bookings.map((booking) => <BookingRow key={booking.id} booking={booking} />)}</div></>; }
function MessagesTab() { return <><div className="content-heading"><div><span className="eyebrow">Aloqa</span><h2>Xabarlar</h2><p>Ijara egalari va mijozlar bilan yozishing.</p></div><button className="primary-button"><Plus size={16} /> Yangi xabar</button></div><div className="messages-panel"><div className="conversation-list"><div className="conversation-search"><Search size={15} /><input placeholder="Xabarlarni qidirish" /></div><Conversation initials="SM" name="Sardor Mamatov" message="Salom, texnika 18-sentabrga tayyor..." time="12:42" active unread /><Conversation initials="BT" name="Bekzod Transport" message="To‘lov bo‘yicha savolingizga javob..." time="Kecha" /><Conversation initials="ER" name="Energo Rent" message="Rahmat, kelishdik." time="10 sen" /></div><div className="chat-window"><div className="chat-head"><span className="avatar">SM</span><span><strong>Sardor Mamatov</strong><small><i /> Hozir onlayn</small></span><button><MoreHorizontal size={18} /></button></div><div className="chat-body"><span className="chat-date">BUGUN</span><div className="message received">Assalomu alaykum! XCMG krani bo‘yicha so‘rovingizni ko‘rdim.<small>12:38</small></div><div className="message received">18–20 sentabr kunlari texnika bo‘sh. Operator bilan kerakmi?<small>12:39</small></div><div className="message sent">Va alaykum assalom. Ha, operator bilan bo‘lsin. Narx ichiga yetkazib berish ham kiradimi?<small>12:41 <Check size={12} /></small></div></div><div className="chat-input"><button><Plus size={18} /></button><input placeholder="Xabar yozing..." /><button className="send-button"><Send size={16} /></button></div></div></div></>; }
function Conversation({ initials, name, message, time, active, unread }) { return <button className={`conversation ${active ? 'active' : ''}`}><span className="avatar">{initials}</span><span><strong>{name}</strong><small>{message}</small></span><time>{time}</time>{unread && <i className="unread-dot" />}</button>; }
function PaymentsTab({ bookings }) { return <><div className="content-heading"><div><span className="eyebrow">Moliya</span><h2>To‘lovlar tarixi</h2><p>Barcha to‘lovlar va hisob-fakturalar.</p></div><button className="outline-button"><WalletCards size={15} /> Hisob raqamlari</button></div><div className="payment-summary"><div><span className="stat-icon green"><CircleDollarSign size={19} /></span><small>Jami to‘langan</small><strong>13.95 mln so‘m</strong></div><div><span className="stat-icon blue"><CreditCard size={19} /></span><small>To‘lovlar soni</small><strong>8 ta</strong></div><div><span className="stat-icon orange"><Clock3 size={19} /></span><small>Kutilayotgan</small><strong>9.6 mln so‘m</strong></div></div><div className="payments-table"><div className="table-head"><span>To‘lov</span><span>Sana</span><span>Usul</span><span>Summa</span><span>Holat</span></div>{bookings.map((booking) => <div className="table-row" key={booking.id}><span><b>#{booking.id}</b><small>{booking.equipment.name}</small></span><span>12 sen 2026</span><span><CreditCard size={14} /> {booking.payment}</span><strong>{formatPrice(booking.total)}</strong><span className={`status ${booking.status === 'Yakunlandi' ? 'done' : 'pending'}`}><i /> {booking.status === 'Yakunlandi' ? 'To‘langan' : 'Kutilmoqda'}</span></div>)}</div></>; }

function Admin({ equipment, bookings, notify }) { const [adminTab, setAdminTab] = useState('overview'); return <section className="admin-page"><div className="admin-topbar"><div className="page-width admin-topbar-inner"><div><span className="admin-kicker"><BarChart3 size={14} /> Boshqaruv markazi</span><h1>Admin panel</h1><p>ArendaTexnika platformasini bir joydan nazorat qiling.</p></div><div className="admin-date"><CalendarDays size={16} /> 12 sentabr 2026 <button onClick={() => notify('Hisobot yuklanmoqda...')}><ArrowUpRight size={16} /> Hisobot</button></div></div></div><div className="page-width admin-layout"><aside className="admin-sidebar"><div className="admin-company"><span className="brand-mark"><HardHat size={19} /></span><span><strong>Arenda</strong><em>Texnika</em><small>Administrator</small></span></div><span className="admin-nav-label">ASOSIY</span><button className={adminTab === 'overview' ? 'active' : ''} onClick={() => setAdminTab('overview')}><LayoutDashboard size={17} /> Umumiy ko‘rinish</button><button className={adminTab === 'users' ? 'active' : ''} onClick={() => setAdminTab('users')}><Users size={17} /> Foydalanuvchilar <b>2.4k</b></button><button className={adminTab === 'listings' ? 'active' : ''} onClick={() => setAdminTab('listings')}><Package size={17} /> E’lonlar <b>18</b></button><button className={adminTab === 'orders' ? 'active' : ''} onClick={() => setAdminTab('orders')}><CalendarCheck2 size={17} /> Buyurtmalar</button><span className="admin-nav-label">BOSHQARUV</span><button onClick={() => notify('Kategoriyalar boshqaruvi')}><ListFilter size={17} /> Kategoriyalar</button><button onClick={() => notify('Sharhlar moderatsiyasi')}><MessageCircle size={17} /> Sharhlar <b className="alert-count">6</b></button><button onClick={() => notify('Bildirishnoma yaratish')}><MegaphoneIcon /> Bildirishnomalar</button><div className="admin-sidebar-bottom"><button><Settings size={17} /> Sozlamalar</button><button><ArrowRight size={17} /> Saytga qaytish</button></div></aside><div className="admin-content">{adminTab === 'overview' && <AdminOverview equipment={equipment} bookings={bookings} notify={notify} />}{adminTab === 'users' && <AdminUsers notify={notify} />}{adminTab === 'listings' && <AdminListings equipment={equipment} notify={notify} />}{adminTab === 'orders' && <AdminOrders bookings={bookings} notify={notify} />}</div></div></section>; }
function MegaphoneIcon() { return <span className="custom-megaphone">◈</span>; }
function AdminOverview({ equipment, bookings, notify }) { return <><div className="admin-heading"><div><span className="eyebrow">Bugungi ko‘rsatkichlar</span><h2>Salom, administrator <span>✦</span></h2><p>Platformangizdagi eng muhim yangiliklar shu yerda.</p></div><button className="dark-button" onClick={() => notify('Yangi e’lonlar ko‘rib chiqilmoqda.')}>Moderatsiyani ko‘rish <ArrowRight size={16} /></button></div><div className="admin-stat-grid"><AdminStat icon={Users} label="Jami foydalanuvchilar" value="2,428" change="+8.2%" color="blue" /><AdminStat icon={Package} label="Faol e’lonlar" value="1,204" change="+4.6%" color="orange" /><AdminStat icon={CircleDollarSign} label="Umumiy daromad" value="284.6 mln" change="+12.4%" color="green" /><AdminStat icon={CalendarCheck2} label="Faol buyurtmalar" value="86" change="+18.1%" color="purple" /></div><div className="admin-main-grid"><section className="admin-panel chart-panel"><div className="panel-heading"><div><span className="eyebrow">Platforma daromadi</span><h2>Daromad analitikasi</h2></div><select><option>So‘nggi 6 oy</option><option>Bu yil</option></select></div><div className="admin-chart"><div className="chart-y"><span>80 mln</span><span>60 mln</span><span>40 mln</span><span>20 mln</span><span>0</span></div><div className="chart-area"><div className="chart-grid-lines"><i /><i /><i /><i /><i /></div><svg viewBox="0 0 600 220" preserveAspectRatio="none"><defs><linearGradient id="adminGradient" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#4e9688" stopOpacity=".32" /><stop offset="100%" stopColor="#4e9688" stopOpacity="0" /></linearGradient></defs><path d="M0,178 C30,180 46,145 82,154 S125,138 152,148 S186,110 214,124 S248,102 275,114 S312,73 340,94 S380,64 408,79 S446,38 472,58 S518,44 548,49 S578,22 600,28 L600,220 L0,220 Z" fill="url(#adminGradient)" /><path d="M0,178 C30,180 46,145 82,154 S125,138 152,148 S186,110 214,124 S248,102 275,114 S312,73 340,94 S380,64 408,79 S446,38 472,58 S518,44 548,49 S578,22 600,28" fill="none" stroke="#4e9688" strokeWidth="3" /></svg><div className="chart-x"><span>Apr</span><span>May</span><span>Iyun</span><span>Iyul</span><span>Avg</span><span>Sen</span></div></div></div></section><section className="admin-panel category-performance"><div className="panel-heading"><div><span className="eyebrow">Tahlil</span><h2>Top kategoriyalar</h2></div><button className="icon-button light"><MoreHorizontal size={17} /></button></div><div className="donut-wrap"><div className="donut-chart"><strong>1,204<small>e’lon</small></strong></div><div className="donut-legend"><span><i className="dot-sand" /> Ekskavatorlar <b>34%</b></span><span><i className="dot-blue" /> Kranlar <b>22%</b></span><span><i className="dot-orange" /> Samosvallar <b>19%</b></span><span><i className="dot-gray" /> Boshqa <b>25%</b></span></div></div></section></div><section className="admin-panel moderation-panel"><div className="panel-heading"><div><span className="eyebrow">E’tibor talab qiladi</span><h2>Moderatsiya navbati <span className="heading-count">8</span></h2></div><button className="text-button" onClick={() => notify('Barcha e’lonlar ochildi.')}>Barchasini ko‘rish <ArrowRight size={15} /></button></div><div className="moderation-list">{equipment.slice(0, 4).map((item, index) => <div className="moderation-row" key={item.id}><img src={item.image} alt="" /><span><strong>{item.name}</strong><small>{index % 2 === 0 ? 'Yangi e’lon' : 'Rasm yangilangan'} · {index + 1} soat oldin</small></span><span className="moderation-owner"><span className="avatar avatar-tiny">{item.ownerAvatar}</span>{item.owner}</span><button className="icon-button light" onClick={() => notify(`${item.name} ko‘rib chiqilmoqda`)}><Eye size={16} /></button><button className="icon-button light" onClick={() => notify('E’lon tasdiqlandi')}><Check size={16} /></button></div>)}</div></section></>; }
function AdminStat({ icon: Icon, label, value, change, color }) { return <div className="admin-stat"><span className={`stat-icon ${color}`}><Icon size={19} /></span><span><small>{label}</small><strong>{value}</strong></span><b className="positive"><ArrowUpRight size={13} /> {change}</b></div>; }
function AdminUsers({ notify }) { const users = [['AK', 'Azizbek Qurbonov', 'azizbek@mail.uz', 'Egasi', 'Faol'], ['SM', 'Sardor Mamatov', 'sardor@mail.uz', 'Ijarachi', 'Faol'], ['BT', 'Bekzod Transport', 'info@bekzod.uz', 'Biznes', 'Faol'], ['NA', 'Nodira Abdullayeva', 'nodira@mail.uz', 'Ijarachi', 'Tekshiruvda']]; return <><div className="admin-heading compact"><div><span className="eyebrow">2,428 ta akkaunt</span><h2>Foydalanuvchilar</h2><p>Platformadagi barcha foydalanuvchilarni boshqaring.</p></div><button className="dark-button" onClick={() => notify('Foydalanuvchi qo‘shish oynasi') }><Plus size={16} /> Foydalanuvchi qo‘shish</button></div><div className="admin-table-wrap"><div className="admin-table-toolbar"><div className="table-search"><Search size={16} /><input placeholder="Ism yoki email bo‘yicha qidiring" /></div><button className="outline-button"><Filter size={15} /> Filtr</button></div><div className="admin-table"><div className="admin-table-head"><span>Foydalanuvchi</span><span>Rol</span><span>Ro‘yxatdan o‘tgan</span><span>Holat</span><span /></div>{users.map((user, index) => <div className="admin-table-row" key={user[1]}><span className="table-user"><span className="avatar">{user[0]}</span><span><b>{user[1]}</b><small>{user[2]}</small></span></span><span>{user[3]}</span><span>{12 - index} sen 2026</span><span className={`status ${user[4] === 'Faol' ? 'confirmed' : 'pending'}`}><i /> {user[4]}</span><button onClick={() => notify('Foydalanuvchi amallari')}><MoreHorizontal size={17} /></button></div>)}</div></div></>; }
function AdminListings({ equipment, notify }) { return <><div className="admin-heading compact"><div><span className="eyebrow">1,204 ta e’lon</span><h2>E’lonlarni boshqarish</h2><p>Yangi e’lonlarni tekshiring va platformani tartibli saqlang.</p></div><button className="outline-button"><Filter size={15} /> Filtrlar</button></div><div className="admin-table-wrap"><div className="admin-table-toolbar"><div className="table-search"><Search size={16} /><input placeholder="Texnika nomi bo‘yicha qidiring" /></div><span className="table-toolbar-note"><i /> 8 ta moderatsiyada</span></div><div className="admin-listing-table">{equipment.map((item) => <div className="admin-listing-row" key={item.id}><img src={item.image} alt="" /><span><b>{item.name}</b><small><MapPin size={12} /> {item.location}</small></span><span>{item.category}</span><strong>{formatPrice(item.price)}<small>/ kuniga</small></strong><span className="status confirmed"><i /> Faol</span><button onClick={() => notify(`${item.name} tahrirlash`)}><Edit3 size={15} /></button></div>)}</div></div></>; }
function AdminOrders({ bookings, notify }) { return <><div className="admin-heading compact"><div><span className="eyebrow">86 ta buyurtma</span><h2>Buyurtmalar</h2><p>Barcha bandlovlar holatini kuzating.</p></div><button className="outline-button"><Filter size={15} /> Filtrlar</button></div><div className="admin-table-wrap"><div className="admin-table"><div className="admin-table-head orders"><span>Buyurtma</span><span>Mijoz</span><span>Texnika</span><span>Sana</span><span>Holat</span><span /></div>{[...bookings, ...bookings].map((booking, index) => <div className="admin-table-row orders" key={`${booking.id}-${index}`}><span><b>#{booking.id}</b><small>12 sen 2026</small></span><span><span className="table-user compact"><span className="avatar avatar-tiny">MK</span><b>Murod Karimov</b></span></span><span>{booking.equipment.name}</span><span>{booking.start}</span><span className={`status ${booking.status === 'Yakunlandi' ? 'done' : 'confirmed'}`}><i /> {booking.status}</span><button onClick={() => notify('Buyurtma tafsilotlari')}><MoreHorizontal size={17} /></button></div>)}</div></div></>; }

function Footer({ goTo }) { return <footer className="site-footer"><div className="page-width footer-top"><div className="footer-brand"><button className="brand" onClick={() => goTo('home')}><span className="brand-mark"><HardHat size={21} /></span><span><strong>Arenda</strong><em>Texnika</em></span></button><p>Qurilish ishingizga kerakli texnika — bir necha klikda.</p><div className="social-row"><span>in</span><span>f</span><span>tg</span><span>◎</span></div></div><div className="footer-links"><div><strong>Platforma</strong><button onClick={() => goTo('catalog')}>Katalog</button><button>Qanday ishlaydi?</button><button>Texnika joylash</button><button>Hamkorlik</button></div><div><strong>Yordam</strong><button>Yordam markazi</button><button>Foydalanish shartlari</button><button>Maxfiylik siyosati</button><button>Biz bilan bog‘lanish</button></div><div className="footer-contact"><strong>Aloqa</strong><a href="tel:+998712000000"><Phone size={14} /> +998 71 200 00 00</a><a href="mailto:hello@arendatexnika.uz"><Mail size={14} /> hello@arendatexnika.uz</a><small>Toshkent shahri, Yunusobod tumani</small></div></div></div><div className="page-width footer-bottom"><span>© 2026 ArendaTexnika. Barcha huquqlar himoyalangan.</span><span><span className="online-dot" /> Platforma faol</span><span>O‘zbekistonda yaratilgan <span>♥</span></span></div></footer>; }

createRoot(document.getElementById('root')).render(<App />);
