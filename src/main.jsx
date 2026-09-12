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
import './ios17-overrides.css';
import './security-a11y.css';
import './production-polish.css';

const toolImage = (name) => `/assets/${name}`;
const equipmentSeed = [
  {
    id: 1, name: 'Makita DDF485 shurupovyor', category: 'Shurupovyor', location: 'Toshkent shahri', price: 120000,
    rating: 4.9, reviews: 28, year: 2023, power: '18 V', capacity: '13 mm', owner: 'Usta Rent', ownerAvatar: 'UR',
    image: toolImage('cordless-drill.jpg'), gallery: [toolImage('cordless-drill.jpg')],
    verified: true, featured: true, description: 'Yengil va kuchli akkumulyatorli shurupovyor. Mebel yig‘ish, gipsokarton va montaj ishlari uchun qulay.'
  },
  {
    id: 2, name: 'Bosch GBH 2-28 perforator', category: 'Perforator', location: 'Toshkent viloyati', price: 180000,
    rating: 4.8, reviews: 21, year: 2022, power: '880 W', capacity: '28 mm', owner: 'Sardor Tools', ownerAvatar: 'ST',
    image: toolImage('rotary-hammer.jpg'), gallery: [toolImage('rotary-hammer.jpg')],
    verified: true, featured: true, description: 'Beton va g‘ishtni teshish, shtroba ochish hamda yengil buzish ishlari uchun professional perforator.'
  },
  {
    id: 3, name: 'Makita GA5030 bolgarka', category: 'Bolgarka', location: 'Samarqand shahri', price: 90000,
    rating: 4.7, reviews: 34, year: 2023, power: '720 W', capacity: '125 mm', owner: 'Bek Tools', ownerAvatar: 'BT',
    image: toolImage('angle-grinder.jpg'), gallery: [toolImage('angle-grinder.jpg')],
    verified: true, featured: true, description: 'Metall kesish, silliqlash va tozalash uchun ixcham, ishonchli elektr bolgarka.'
  },
  {
    id: 4, name: 'DeWalt DWE575 diskli arra', category: 'Diskli arra', location: 'Farg‘ona viloyati', price: 140000,
    rating: 4.9, reviews: 16, year: 2022, power: '1600 W', capacity: '190 mm', owner: 'Farrux Usta', ownerAvatar: 'FU',
    image: toolImage('circular-saw.jpg'), gallery: [toolImage('circular-saw.jpg')],
    verified: true, featured: false, description: 'Yog‘och va qurilish plitalarini tekis, aniq kesish uchun kuchli diskli arra.'
  },
  {
    id: 5, name: 'ProMix 160 beton aralashtirgich', category: 'Beton uskunasi', location: 'Toshkent shahri', price: 450000,
    rating: 4.6, reviews: 11, year: 2021, power: '700 W', capacity: '160 litr', owner: 'ProRent Group', ownerAvatar: 'PG',
    image: toolImage('concrete-mixer.jpg'), gallery: [toolImage('concrete-mixer.jpg')],
    verified: true, featured: false, description: 'Beton, qorishma va suvoq materiallarini tayyorlash uchun g‘ildirakli, qulay aralashtirgich.'
  },
  {
    id: 6, name: 'Resanta SAI-250 payvandlash', category: 'Payvandlash', location: 'Andijon shahri', price: 170000,
    rating: 4.8, reviews: 13, year: 2023, power: '250 A', capacity: '1.6–5 mm', owner: 'Energo Usta', ownerAvatar: 'EU',
    image: toolImage('welding-inverter.jpg'), gallery: [toolImage('welding-inverter.jpg')],
    verified: false, featured: false, description: 'Uy, ustaxona va qurilishdagi montaj ishlari uchun ixcham invertor payvandlash apparati.'
  },
  {
    id: 7, name: 'Aluminiy narvon va iskala', category: 'Narvon va iskala', location: 'Namangan viloyati', price: 240000,
    rating: 4.7, reviews: 8, year: 2023, power: '—', capacity: '4.5 m', owner: 'Usta Service', ownerAvatar: 'US',
    image: toolImage('other-ladder.jpg'), gallery: [toolImage('other-ladder.jpg')],
    verified: true, featured: false, isOther: true, description: 'Bo‘yoq, fasad va montaj ishlari uchun yengil aluminiy narvon hamda yig‘ma iskala.'
  },
  {
    id: 8, name: 'Bosch GLL lazer nivo', category: 'Lazer nivo', location: 'Qashqadaryo viloyati', price: 160000,
    rating: 4.9, reviews: 10, year: 2023, power: '12 V', capacity: '30 m', owner: 'Level Pro', ownerAvatar: 'LP',
    image: toolImage('other-laser-level.jpg'), gallery: [toolImage('other-laser-level.jpg')],
    verified: true, featured: false, isOther: true, description: 'Tekislash, kafel va gipsokarton montaji uchun aniq yashil nurli lazer nivo.'
  },
  {
    id: 9, name: 'Honda EU22 generator', category: 'Generator', location: 'Buxoro viloyati', price: 280000,
    rating: 4.8, reviews: 12, year: 2022, power: '2.2 kW', capacity: '15 litr', owner: 'Energo Usta', ownerAvatar: 'EU',
    image: toolImage('other-generator.jpg'), gallery: [toolImage('other-generator.jpg')],
    verified: true, featured: false, isOther: true, description: 'Qurilish maydonchasi va dala sharoitida barqaror elektr uchun ixcham generator.'
  },
  {
    id: 10, name: 'Karcher K4 yuvish apparati', category: 'Bosimli yuvish', location: 'Toshkent shahri', price: 190000,
    rating: 4.6, reviews: 7, year: 2022, power: '1.8 kW', capacity: '130 bar', owner: 'Clean Rent', ownerAvatar: 'CR',
    image: toolImage('other-pressure-washer.jpg'), gallery: [toolImage('other-pressure-washer.jpg')],
    verified: false, featured: false, isOther: true, description: 'Fasad, hovli, avtomobil va qurilishdan keyingi tozalash uchun bosimli yuvish apparati.'
  }
];
const otherRentalSeed = equipmentSeed.filter((item) => item.isOther);

const categories = [
  { name: 'Shurupovyortlar', short: 'Shurupovyor', count: '86 ta', color: 'blue', icon: toolImage('icon-drill.png') },
  { name: 'Perforatorlar', short: 'Perforator', count: '64 ta', color: 'teal', icon: toolImage('icon-perforator.png') },
  { name: 'Bolgarkalar', short: 'Bolgarka', count: '72 ta', color: 'orange', icon: toolImage('icon-grinder.png') },
  { name: 'Beton uskunalari', short: 'Beton uskunasi', count: '36 ta', color: 'green', icon: toolImage('icon-mixer.png') }
];
const otherCategories = [
  { name: 'Diskli arralar', short: 'Diskli arra', count: '48 ta', color: 'purple', icon: toolImage('icon-saw.png') },
  { name: 'Payvandlash', short: 'Payvandlash', count: '57 ta', color: 'gray', icon: toolImage('icon-welder.png') },
  { name: 'Narvon va iskala', short: 'Narvon va iskala', count: '22 ta', color: 'blue', icon: toolImage('other-ladder.jpg') },
  { name: 'Lazer nivo', short: 'Lazer nivo', count: '18 ta', color: 'teal', icon: toolImage('other-laser-level.jpg') },
  { name: 'Generatorlar', short: 'Generator', count: '27 ta', color: 'orange', icon: toolImage('other-generator.jpg') },
  { name: 'Bosimli yuvish', short: 'Bosimli yuvish', count: '14 ta', color: 'gray', icon: toolImage('other-pressure-washer.jpg') }
];
const allCategories = [...categories, ...otherCategories];

const initialBookings = [
  { id: 'AT-2048', equipment: equipmentSeed[1], start: '2026-09-18', end: '2026-09-20', days: 3, total: 540000, status: 'Tasdiqlandi', payment: 'Payme' },
  { id: 'AT-1994', equipment: equipmentSeed[2], start: '2026-08-05', end: '2026-08-07', days: 3, total: 270000, status: 'Yakunlandi', payment: 'Naqd' }
];

const storage = {
  read(key, fallback) {
    try {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch {
      return fallback;
    }
  },
  write(key, value) {
    try { window.localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage may be disabled */ }
  }
};
const dateISO = (offset = 0) => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return date.toISOString().slice(0, 10);
};
const formatPrice = (price) => `${new Intl.NumberFormat('uz-UZ').format(price)} so'm`;
const shortPrice = (price) => price >= 1000000 ? `${(price / 1000000).toFixed(1).replace('.0', '')} mln` : `${Math.round(price / 1000)} ming`;
const calculateDays = (start, end) => {
  if (!start || !end) return 1;
  const diff = (new Date(`${end}T00:00:00`) - new Date(`${start}T00:00:00`)) / 86400000;
  return Math.max(1, Math.floor(diff) + 1);
};

const regions = [
  { name: 'Barcha viloyatlar', count: '360+' },
  { name: 'Toshkent shahri', count: '128' },
  { name: 'Toshkent viloyati', count: '74' },
  { name: 'Samarqand viloyati', count: '42' },
  { name: 'Farg‘ona viloyati', count: '31' },
  { name: 'Andijon viloyati', count: '26' },
  { name: 'Namangan viloyati', count: '22' },
  { name: 'Qashqadaryo viloyati', count: '19' },
  { name: 'Buxoro viloyati', count: '18' },
  { name: 'Xorazm viloyati', count: '14' },
  { name: 'Navoiy viloyati', count: '11' },
  { name: 'Surxondaryo viloyati', count: '9' }
];

const translations = {
  UZ: { home: 'Bosh sahifa', catalog: 'Katalog', how: 'Qanday ishlaydi?', help: 'Yordam', login: 'Kirish', allRegions: 'Barcha viloyatlar', search: 'Qidirish', chooseRegion: 'Hududingizni tanlang', featured: 'Tavsiya etilgan asboblar', categories: 'Kategoriyalar', categoryQuestion: 'Qaysi asbob kerak?', all: 'Barchasini ko‘rish', heroLead: 'Ustalar uchun', heroAccent: 'to‘g‘ri asbob.', heroDesc: 'Kerakli asbobni toping, sanalarni belgilang va ishingizni kechiktirmang. Ishonchli egalar, aniq narxlar.', startSearch: 'Qidirishni boshlash', owner: 'Sizda asbob bormi?', ownerTitle: 'Asbobingiz bekor turmasin.' },
  RU: { home: 'Главная', catalog: 'Каталог', how: 'Как это работает?', help: 'Помощь', login: 'Войти', allRegions: 'Все регионы', search: 'Поиск', chooseRegion: 'Выберите регион', featured: 'Рекомендуемые инструменты', categories: 'Категории', categoryQuestion: 'Какой инструмент нужен?', all: 'Смотреть все', heroLead: 'Для мастеров —', heroAccent: 'нужный инструмент.', heroDesc: 'Найдите инструмент, выберите даты и не откладывайте работу. Надёжные владельцы, честные цены.', startSearch: 'Начать поиск', owner: 'У вас есть инструмент?', ownerTitle: 'Пусть инструмент приносит доход.' },
  EN: { home: 'Home', catalog: 'Catalog', how: 'How it works', help: 'Help', login: 'Sign in', allRegions: 'All regions', search: 'Search', chooseRegion: 'Choose your region', featured: 'Recommended tools', categories: 'Categories', categoryQuestion: 'What tool do you need?', all: 'View all', heroLead: 'For every builder —', heroAccent: 'the right tool.', heroDesc: 'Find the tool you need, choose your dates and keep your project moving. Trusted owners, clear prices.', startSearch: 'Start searching', owner: 'Do you own a tool?', ownerTitle: 'Let your tools earn.' }
};

function App() {
  const [page, setPage] = useState('home');
  const [equipment, setEquipment] = useState(equipmentSeed);
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState('');
  const [searchDraft, setSearchDraft] = useState('');
  const [category, setCategory] = useState('Barchasi');
  const [location, setLocation] = useState(() => {
    const value = storage.read('arenda-location-v1', '');
    return typeof value === 'string' ? value : '';
  });
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [favorites, setFavorites] = useState(() => {
    const value = storage.read('arenda-favorites-v1', [2]);
    return new Set(Array.isArray(value) ? value.filter((item) => Number.isInteger(item)) : [2]);
  });
  const [bookings, setBookings] = useState(() => {
    const value = storage.read('arenda-bookings-v1', initialBookings);
    return Array.isArray(value) && value.every((item) => item && item.id && item.equipment) ? value : initialBookings;
  });
  const [toast, setToast] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [listingOpen, setListingOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pendingBooking, setPendingBooking] = useState(null);
  const [pendingListing, setPendingListing] = useState(false);
  const [dashboardStartTab, setDashboardStartTab] = useState('overview');
  const [regionOpen, setRegionOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [lang, setLang] = useState(() => {
    const value = storage.read('arenda-language-v1', 'UZ');
    return ['UZ', 'RU', 'EN'].includes(value) ? value : 'UZ';
  });

  const selectedEquipment = equipment.find((item) => item.id === selectedId) || equipment[0];
  const copy = translations[lang];
  const stats = useMemo(() => {
    const rated = equipment.filter((item) => item.rating > 0);
    const averageRating = rated.length ? rated.reduce((sum, item) => sum + item.rating, 0) / rated.length : 0;
    return {
      activeTools: equipment.length,
      regions: new Set(equipment.map((item) => item.location)).size,
      averageRating: averageRating.toFixed(1),
      reviews: equipment.reduce((sum, item) => sum + (item.reviews || 0), 0),
      satisfaction: averageRating ? Math.round((averageRating / 5) * 100) : 0
    };
  }, [equipment]);
  const filteredEquipment = useMemo(() => equipment.filter((item) => {
    const matchesText = !search || `${item.name} ${item.category} ${item.location}`.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'Barchasi' || item.category === category;
    const normalizedLocation = location.toLowerCase().replace(' viloyati', '').replace(' shahri', '');
    const matchesLocation = !location || item.location.toLowerCase().includes(normalizedLocation);
    const matchesPrice = item.price <= maxPrice;
    const matchesFavorite = !favoritesOnly || favorites.has(item.id);
    return matchesText && matchesCategory && matchesLocation && matchesPrice && matchesFavorite;
  }), [equipment, search, category, location, maxPrice, favoritesOnly, favorites]);

  useEffect(() => {
    if (!toast) return undefined;
    const timeout = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(timeout);
  }, [toast]);
  useEffect(() => storage.write('arenda-location-v1', location), [location]);
  useEffect(() => storage.write('arenda-favorites-v1', [...favorites]), [favorites]);
  useEffect(() => storage.write('arenda-bookings-v1', bookings), [bookings]);
  useEffect(() => storage.write('arenda-language-v1', lang), [lang]);

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
      else { next.add(id); notify('Asbob sevimlilarga saqlandi'); }
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
  const selectRegion = (value) => {
    setLocation(value === 'Barcha viloyatlar' ? '' : value);
    setRegionOpen(false);
    notify(value === 'Barcha viloyatlar' ? 'Barcha hududlar ko‘rsatildi' : `${value} bo‘yicha e’lonlar ko‘rsatildi`);
  };
  const finalizeBooking = (details) => {
    const booking = {
      id: `AT-${Math.floor(2000 + Math.random() * 7000)}`,
      equipment: selectedEquipment, ...details, status: 'Kutilmoqda'
    };
    setBookings((current) => [booking, ...current]);
    setBookingOpen(false);
    setPendingBooking(null);
    setDashboardStartTab('bookings');
    notify('So‘rovingiz egasiga yuborildi. Tez orada javob keladi.');
    goTo('dashboard');
  };
  const createBooking = (details) => {
    if (!details.start || !details.end || new Date(details.end) < new Date(details.start)) {
      notify('Tugash sanasi boshlanish sanasidan keyin bo‘lishi kerak.', 'error');
      return;
    }
    if (!isAuthenticated) {
      setPendingBooking(details);
      setAuthOpen(true);
      notify('Band qilish uchun avval hisobingizga kiring.');
      return;
    }
    finalizeBooking(details);
  };
  const completeAuth = () => {
    setIsAuthenticated(true);
    setAuthOpen(false);
    notify('Hisobingizga muvaffaqiyatli kirdingiz.');
    if (pendingBooking) finalizeBooking(pendingBooking);
    if (pendingListing) { setPendingListing(false); setListingOpen(true); }
  };
  const openListing = () => {
    if (!isAuthenticated) {
      setPendingListing(true);
      setAuthOpen(true);
      notify('E’lon joylash uchun avval hisob yarating.');
      return;
    }
    setListingOpen(true);
  };
  const contactOwner = () => {
    if (!isAuthenticated) {
      setAuthOpen(true);
      notify('Arendator bilan yozishish uchun hisobga kiring.');
      return;
    }
    setDashboardStartTab('messages');
    goTo('dashboard');
  };
  const addListing = (form) => {
    const newItem = {
      id: Date.now(), name: form.name, category: form.category, location: form.location,
      price: Number(form.price), rating: 0, reviews: 0, year: Number(form.year) || 2024,
      power: form.power || '—', capacity: form.capacity || '—', owner: 'Murod Karimov', ownerAvatar: 'MK', verified: false,
      featured: false, description: form.description || 'Yangi e’lon qilingan qurilish asbobi.',
      image: form.image || toolImage('cordless-drill.jpg'),
      gallery: [form.image || toolImage('cordless-drill.jpg')]
    };
    setEquipment((current) => [newItem, ...current]);
    setListingOpen(false);
    notify('E’loningiz moderatsiyaga yuborildi.');
    goTo('dashboard');
  };

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Asosiy kontentga o‘tish</a>
      <header className="site-header">
        <div className="header-inner">
          <button className="brand" onClick={() => goTo('home')} aria-label="ArendaTexnika bosh sahifa">
            <span className="brand-mark"><img src="/assets/arendatexnika-logo.png" alt="" /></span>
            <span><strong>Arenda</strong><em>Texnika</em></span>
          </button>
          <nav className={`main-nav ${mobileMenuOpen ? 'is-open' : ''}`}>
            <button className={page === 'home' ? 'active' : ''} onClick={() => goTo('home')}>{copy.home}</button>
            <button className={page === 'catalog' || page === 'detail' ? 'active' : ''} onClick={() => goTo('catalog')}>{copy.catalog}</button>
            <button onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}>{copy.how}</button>
            <button onClick={() => notify('Yordam markazi tez orada ishga tushadi.')}>{copy.help}</button>
          </nav>
          <div className="header-actions">
            <button className="language-button" onClick={() => { setLang(lang === 'UZ' ? 'RU' : lang === 'RU' ? 'EN' : 'UZ'); notify(`Til: ${lang === 'UZ' ? 'Русский' : lang === 'RU' ? 'English' : 'O‘zbekcha'}`); }}><Globe2 size={16} /> {lang}<ChevronDown size={13} /></button>
            <button className="region-chip" onClick={() => setRegionOpen(true)}><MapPin size={15} /><span>{location || copy.allRegions}</span><ChevronDown size={13} /></button>
            <button className="icon-button desktop-only" onClick={openFavorites} aria-label={`Sevimlilar: ${favorites.size} ta`}><Heart size={19} /><span className="icon-counter">{favorites.size}</span></button>
            <div className="popover-anchor">
              <button className="icon-button" onClick={() => { setNotificationsOpen(!notificationsOpen); setUserMenuOpen(false); }} aria-label="Bildirishnomalar"><Bell size={19} /><span className="notification-dot" /></button>
              {notificationsOpen && <NotificationPopover />}
            </div>
            <div className="user-area">
              {isAuthenticated ? <><button className="user-chip" onClick={() => { setUserMenuOpen(!userMenuOpen); setNotificationsOpen(false); }}>
                <span className="avatar avatar-small">MK</span><span className="user-chip-name">Murod Karimov</span><ChevronDown size={14} />
              </button>{userMenuOpen && <UserPopover goTo={goTo} openAuth={() => setAuthOpen(true)} />}</> : <button className="login-button" onClick={() => setAuthOpen(true)}><UserCircle size={16} /> {copy.login}</button>}
            </div>
            <button className="mobile-menu-button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menyu">{mobileMenuOpen ? <X /> : <Menu />}</button>
          </div>
        </div>
      </header>

      <main id="main-content">
        {page === 'home' && <Home copy={copy} stats={stats} equipment={equipment} searchDraft={searchDraft} setSearchDraft={setSearchDraft} submitSearch={submitSearch} chooseCategory={chooseCategory} openDetail={openDetail} toggleFavorite={toggleFavorite} favorites={favorites} setListingOpen={openListing} goTo={goTo} location={location} openRegionPicker={() => setRegionOpen(true)} />}
        {page === 'catalog' && <Catalog copy={copy} items={filteredEquipment} searchDraft={searchDraft} setSearchDraft={setSearchDraft} submitSearch={submitSearch} category={category} setCategory={(value) => { setCategory(value); setFavoritesOnly(false); }} location={location} setLocation={setLocation} openRegionPicker={() => setRegionOpen(true)} maxPrice={maxPrice} setMaxPrice={setMaxPrice} favorites={favorites} toggleFavorite={toggleFavorite} openDetail={openDetail} favoritesOnly={favoritesOnly} setFavoritesOnly={setFavoritesOnly} />}
        {page === 'detail' && <Detail item={selectedEquipment} isFavorite={favorites.has(selectedEquipment.id)} toggleFavorite={toggleFavorite} goTo={goTo} setBookingOpen={setBookingOpen} createBooking={createBooking} notify={notify} contactOwner={contactOwner} />}
        {page === 'dashboard' && <Dashboard bookings={bookings} equipment={equipment} goTo={goTo} setListingOpen={openListing} notify={notify} initialTab={dashboardStartTab} />}
        {page === 'admin' && <Admin equipment={equipment} bookings={bookings} notify={notify} />}
      </main>

      {page !== 'admin' && <Footer goTo={goTo} />}
      <MobileDock page={page} goTo={goTo} openFavorites={openFavorites} openAuth={() => setAuthOpen(true)} isAuthenticated={isAuthenticated} />
      {bookingOpen && <BookingModal item={selectedEquipment} close={() => setBookingOpen(false)} confirm={createBooking} />}
      {listingOpen && <ListingModal close={() => setListingOpen(false)} submit={addListing} />}
      {regionOpen && <RegionModal value={location || 'Barcha viloyatlar'} close={() => setRegionOpen(false)} select={selectRegion} />}
      {authOpen && <AuthModal close={() => setAuthOpen(false)} notify={notify} onSuccess={completeAuth} />}
      {toast && <div className={`toast ${toast.type}`}><span className="toast-icon"><Check size={16} /></span>{toast.message}<button onClick={() => setToast(null)}><X size={15} /></button></div>}
    </div>
  );
}

function NotificationPopover() {
  return <div className="popover notification-popover">
    <div className="popover-heading"><strong>Bildirishnomalar</strong><button>Hammasini o‘qilgan</button></div>
    <div className="notification-item"><span className="notification-icon green"><CheckCircle2 size={16} /></span><span><b>Bandlov tasdiqlandi</b><small>Bosch GBH 2-28 perforator • 18–20 sentabr</small><time>12 daqiqa oldin</time></span></div>
    <div className="notification-item"><span className="notification-icon orange"><MessageCircle size={16} /></span><span><b>Yangi xabar</b><small>Sardor Mamatov sizga yozdi</small><time>1 soat oldin</time></span></div>
    <div className="popover-footer">Barcha bildirishnomalar <ArrowRight size={14} /></div>
  </div>;
}

function UserPopover({ goTo, openAuth }) {
  return <div className="popover user-popover">
    <div className="popover-user"><span className="avatar">MK</span><span><strong>Murod Karimov</strong><small>Ijarachi va egasi</small></span></div>
    <button onClick={() => goTo('dashboard')}><LayoutDashboard size={16} /> Kabinetim</button>
    <button onClick={() => goTo('dashboard')}><Heart size={16} /> Sevimlilarim</button>
    <button onClick={() => goTo('admin')}><BarChart3 size={16} /> Admin panel</button>
    <button onClick={() => openAuth()}><Settings size={16} /> Profil sozlamalari</button>
    <div className="popover-divider" />
    <button className="logout"><LockKeyhole size={16} /> Chiqish</button>
  </div>;
}

function Home({ copy, stats, equipment, searchDraft, setSearchDraft, submitSearch, chooseCategory, openDetail, toggleFavorite, favorites, setListingOpen, goTo, location, openRegionPicker }) {
  return <>
    <section className="hero-section">
      <div className="hero-noise" />
      <div className="hero-inner page-width">
        <div className="hero-copy">
          <div className="eyebrow light"><span className="pulse-dot" /> O‘zbekistondagi #1 asboblar marketplace</div>
          <h1>{copy.heroLead}<br /><span>{copy.heroAccent}</span></h1>
          <p>{copy.heroDesc}</p>
          <div className="hero-proof"><span className="proof-avatars"><i>AS</i><i>BK</i><i>NM</i><i>+</i></span><span><strong>{stats.activeTools} ta</strong> asbob hozir katalogda</span></div>
        </div>
        <form className="search-panel" onSubmit={submitSearch}>
          <div className="search-panel-title"><span><Search size={17} /> {copy.search}</span><small>{stats.activeTools} ta e’lon ichidan</small></div>
          <label className="search-field"><span className="field-icon"><Search size={18} /></span><span><small>Asbob turi</small><input value={searchDraft} onChange={(e) => setSearchDraft(e.target.value)} placeholder="Masalan, shurupovyor" /></span></label>
          <div className="search-row">
            <button type="button" className="search-field compact region-field" onClick={openRegionPicker}><span className="field-icon"><MapPin size={18} /></span><span><small>Joylashuv</small><b>{location || copy.allRegions}</b></span><ChevronDown size={14} /></button>
            <label className="search-field compact"><span className="field-icon"><CalendarDays size={18} /></span><span><small>Sana</small><input placeholder="Qachon kerak?" /></span></label>
          </div>
          <button className="primary-button search-submit" type="submit">{copy.startSearch} <ArrowRight size={17} /></button>
          <div className="search-foot"><ShieldCheck size={15} /> Barcha egalar tasdiqlangan</div>
        </form>
      </div>
      <div className="hero-bottom-glow" />
    </section>

    <section className="page-width trust-strip">
      <div><strong>{stats.activeTools}</strong><span>Faol asbob</span></div><div><strong>{stats.regions}</strong><span>Hududda xizmat</span></div><div><strong>{stats.averageRating}/5</strong><span>{stats.reviews} ta sharh</span></div><div><strong>{stats.satisfaction}%</strong><span>Mamnun mijozlar</span></div>
      <div className="trust-note"><ShieldCheck size={20} /><span><b>Tekshirilgan hamjamiyat</b><small>Har bir e’lon nazoratdan o‘tadi</small></span></div>
    </section>

    <section className="page-width section-block categories-section">
      <div className="section-heading"><div><span className="eyebrow">{copy.categories}</span><h2>{copy.categoryQuestion}</h2></div><button className="text-button" onClick={() => goTo('catalog')}>{copy.all} <ArrowRight size={16} /></button></div>
      <div className="category-grid">{categories.map((item) => <button className="category-card" key={item.name} onClick={() => chooseCategory(item.short)}><span className={`category-art ${item.color}`}><img src={item.icon} alt="" /></span><span className="category-content"><strong>{item.name}</strong><small>{item.count}</small></span><ArrowUpRight size={17} className="category-arrow" /></button>)}</div>
    </section>

    <section className="page-width section-block featured-section">
      <div className="section-heading"><div><span className="eyebrow">Bugun ommabop</span><h2>{copy.featured}</h2><p className="section-description">Ustalar eng ko‘p tanlayotgan, tekshirilgan asboblar.</p></div><button className="outline-button" onClick={() => goTo('catalog')}>{copy.catalog} <ArrowRight size={16} /></button></div>
      <div className="equipment-grid">{equipmentSeed.slice(0, 3).map((item) => <EquipmentCard key={item.id} item={item} isFavorite={favorites.has(item.id)} onFavorite={() => toggleFavorite(item.id)} onClick={() => openDetail(item.id)} />)}</div>
    </section>

    <section className="page-width section-block other-rentals-section">
      <div className="section-heading"><div><span className="eyebrow">Yana kerak bo‘lishi mumkin</span><h2>Boshqa arendalar</h2><p className="section-description">Loyihangizni yakunlash uchun qo‘shimcha asboblar.</p></div><button className="text-button" onClick={() => goTo('catalog')}>Barchasini ko‘rish <ArrowRight size={16} /></button></div>
      <div className="other-rentals-grid">{otherRentalSeed.map((item) => <EquipmentCard key={item.id} item={item} isFavorite={favorites.has(item.id)} onFavorite={() => toggleFavorite(item.id)} onClick={() => openDetail(item.id)} />)}</div>
    </section>

    <section className="how-section" id="how-it-works">
      <div className="page-width"><div className="section-heading centered"><div><span className="eyebrow">Oddiy va qulay</span><h2>3 qadamda asbob tayyor</h2><p className="section-description">Qidirishdan ishni boshlashgacha — hammasi bitta joyda.</p></div></div>
        <div className="steps-grid"><div className="step-card"><span className="step-number">01</span><span className="step-icon"><Search size={22} /></span><h3>Qidiring</h3><p>Asbob turi, joylashuvi va sanani belgilang. O‘zingizga mos variantni toping.</p></div><div className="step-line" /><div className="step-card"><span className="step-number">02</span><span className="step-icon"><CalendarCheck2 size={22} /></span><h3>Band qiling</h3><p>Bo‘sh sanalarni tanlang va egaga band qilish so‘rovini yuboring.</p></div><div className="step-line" /><div className="step-card"><span className="step-number">03</span><span className="step-icon"><Truck size={22} /></span><h3>Ishni boshlang</h3><p>Kelishilgan manzilda asbobni qabul qiling va loyihangizni boshlang.</p></div></div>
      </div>
    </section>

    <section className="page-width owner-banner"><div className="owner-banner-copy"><span className="eyebrow">{copy.owner}</span><h2>{copy.ownerTitle}</h2><p>E’lon joylang, minglab mijozlarga yetib boring va daromad oling.</p><button className="dark-button" onClick={() => setListingOpen(true)}>E’lon joylash <Plus size={17} /></button></div><div className="owner-banner-graphic"><div className="graphic-circle" /><div className="graphic-card card-back" /><div className="graphic-card card-front"><span className="mini-label">OYLIK DAROMAD</span><strong>+ 18.4 mln</strong><div className="mini-chart"><i /><i /><i /><i /><i /><i /><i /></div></div><span className="graphic-spark">✦</span></div></section>
  </>;
}

function EquipmentCard({ item, isFavorite, onFavorite, onClick }) {
  return <article className="equipment-card" onClick={onClick}>
    <div className="equipment-image-wrap"><img src={item.image} alt={item.name} /><div className="image-overlay" />{item.featured && <span className="featured-badge"><Sparkles size={12} /> Tavsiya</span>}<button className={`favorite-button ${isFavorite ? 'selected' : ''}`} onClick={(event) => { event.stopPropagation(); onFavorite(); }} aria-label="Sevimliga qo‘shish"><Heart size={17} fill={isFavorite ? 'currentColor' : 'none'} /></button><span className="availability-badge"><i /> Bo‘sh</span></div>
    <div className="equipment-card-body"><div className="card-meta"><span>{item.category}</span><span className="rating"><Star size={13} fill="currentColor" /> {item.rating || 'Yangi'} {item.reviews ? `(${item.reviews})` : ''}</span></div><h3>{item.name}</h3><div className="card-location"><MapPin size={14} /> {item.location}</div><div className="card-footer"><span><b>{formatPrice(item.price)}</b><small>/ kuniga</small></span><button className="card-action" onClick={(event) => { event.stopPropagation(); onClick(); }}>Ko‘rish <ArrowUpRight size={15} /></button></div></div>
  </article>;
}

function Catalog({ copy, items, searchDraft, setSearchDraft, submitSearch, category, setCategory, location, setLocation, openRegionPicker, maxPrice, setMaxPrice, favorites, toggleFavorite, openDetail, favoritesOnly, setFavoritesOnly }) {
  const [mobileFilters, setMobileFilters] = useState(false);
  const [sort, setSort] = useState('Tavsiya etilgan');
  const sortedItems = [...items].sort((a, b) => sort === 'Arzonroq' ? a.price - b.price : sort === 'Reytingi yuqori' ? b.rating - a.rating : 0);
  return <section className="catalog-page page-width">
    <div className="breadcrumbs"><button onClick={() => window.scrollTo({ top: 0 })}>Bosh sahifa</button><ChevronRight size={14} /><span>Katalog</span></div>
    <div className="catalog-heading"><div><span className="eyebrow">{copy.catalog}</span><h1>{copy.categoryQuestion}</h1><p>{items.length} ta natija sizning qidiruvingiz bo‘yicha</p></div><button className="filter-toggle-button" onClick={() => setMobileFilters(!mobileFilters)}><SlidersHorizontal size={17} /> Filtrlar</button></div>
    <div className="catalog-searchbar"><form onSubmit={submitSearch}><Search size={18} /><input value={searchDraft} onChange={(e) => setSearchDraft(e.target.value)} placeholder="Asbob nomi yoki turi bo‘yicha qidiring" /><button type="submit">Qidirish</button></form><button type="button" className="catalog-region-button" onClick={openRegionPicker}><MapPin size={17} /><span>{location || 'Barcha viloyatlar'}</span><ChevronDown size={14} /></button><label><CalendarDays size={17} /><span>Sanani tanlang</span><ChevronDown size={14} /></label></div>
    <div className="catalog-layout">
      <aside className={`filter-sidebar ${mobileFilters ? 'mobile-open' : ''}`}><div className="filter-header"><strong>Filtrlar</strong><button onClick={() => { setCategory('Barchasi'); setLocation(''); setMaxPrice(1000000); setFavoritesOnly(false); }}>Tozalash</button><button className="filter-close" onClick={() => setMobileFilters(false)}><X size={18} /></button></div>
        <FilterGroup title="Asbob turi"><label className="radio-row"><input type="radio" checked={category === 'Barchasi'} onChange={() => setCategory('Barchasi')} /><span className="fake-radio" /> Barchasi <small>420</small></label>{allCategories.map((item) => <label className="radio-row" key={item.short}><input type="radio" checked={category === item.short} onChange={() => setCategory(item.short)} /><span className="fake-radio" /> {item.name} <small>{item.count.replace(' ta', '')}</small></label>)}</FilterGroup>
        <FilterGroup title="Narx oralig‘i"><div className="price-range-values"><span>0 so‘m</span><b>{shortPrice(maxPrice)}</b></div><input className="range-input" type="range" min="50000" max="1000000" step="10000" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} /><div className="range-labels"><span>50 ming</span><span>1 mln+</span></div></FilterGroup>
        <FilterGroup title="Joylashuv"><label className="select-field"><MapPin size={16} /><select value={location} onChange={(e) => setLocation(e.target.value)}><option value="">Barcha hududlar</option><option>Toshkent shahri</option><option>Toshkent viloyati</option><option>Samarqand shahri</option><option>Farg‘ona viloyati</option><option>Andijon shahri</option></select><ChevronDown size={14} /></label></FilterGroup>
        <FilterGroup title="Qo‘shimcha"><label className="check-row"><input type="checkbox" /> <span className="fake-check"><Check size={12} /></span> Faqat tasdiqlanganlar</label><label className="check-row"><input type="checkbox" /> <span className="fake-check"><Check size={12} /></span> Operator bilan</label><label className="check-row"><input type="checkbox" /> <span className="fake-check"><Check size={12} /></span> Yetkazib berish</label></FilterGroup>
      </aside>
      <div className="catalog-results"><div className="results-toolbar"><label className="favorites-filter"><input type="checkbox" checked={favoritesOnly} onChange={(e) => setFavoritesOnly(e.target.checked)} /><Heart size={15} fill={favoritesOnly ? 'currentColor' : 'none'} /> Sevimlilarim</label><div className="sort-select"><span>Saralash:</span><select value={sort} onChange={(e) => setSort(e.target.value)}><option>Tavsiya etilgan</option><option>Arzonroq</option><option>Reytingi yuqori</option></select><ChevronDown size={14} /></div></div>{sortedItems.length ? <div className="equipment-grid">{sortedItems.map((item) => <EquipmentCard key={item.id} item={item} isFavorite={favorites.has(item.id)} onFavorite={() => toggleFavorite(item.id)} onClick={() => openDetail(item.id)} />)}</div> : <EmptyResults clear={() => { setCategory('Barchasi'); setLocation(''); setMaxPrice(1000000); setFavoritesOnly(false); }} />}</div>
    </div>
  </section>;
}

function FilterGroup({ title, children }) { return <div className="filter-group"><h4>{title}</h4>{children}</div>; }
function EmptyResults({ clear }) { return <div className="empty-results"><span><Search size={23} /></span><h3>Hech narsa topilmadi</h3><p>Filtrlarni o‘zgartirib ko‘ring yoki boshqa qidiruv so‘zidan foydalaning.</p><button className="outline-button" onClick={clear}>Filtrlarni tozalash</button></div>; }

function Detail({ item, isFavorite, toggleFavorite, goTo, setBookingOpen, createBooking, notify, contactOwner }) {
  const [activeImage, setActiveImage] = useState(0);
  const [start, setStart] = useState(() => dateISO(2));
  const [end, setEnd] = useState(() => dateISO(4));
  const days = calculateDays(start, end);
  const total = days * item.price;
  return <section className="detail-page page-width"><div className="breadcrumbs"><button onClick={() => goTo('catalog')}>Katalog</button><ChevronRight size={14} /><span>{item.category}</span><ChevronRight size={14} /><span>{item.name}</span></div>
    <button className="back-button" onClick={() => goTo('catalog')}><ChevronLeft size={17} /> Katalogga qaytish</button>
    <div className="detail-layout"><div className="detail-main"><div className="gallery"><div className="gallery-main"><img src={item.gallery?.[activeImage] || item.image} alt={item.name} /><span className="gallery-count"><ImagePlus size={14} /> {item.gallery?.length || 1} rasm</span><button className="gallery-next" onClick={() => setActiveImage((activeImage + 1) % (item.gallery?.length || 1))}><ChevronRight size={20} /></button></div><div className="gallery-thumbs">{(item.gallery || [item.image]).map((src, index) => <button key={src} className={activeImage === index ? 'active' : ''} onClick={() => setActiveImage(index)}><img src={src} alt="" /></button>)}<button className="video-thumb"><span><Zap size={17} /></span><small>Video ko‘rish</small></button></div></div>
      <div className="detail-title-row"><div><div className="detail-labels"><span className="status-pill"><i /> Hozir bo‘sh</span>{item.verified && <span className="verified-pill"><ShieldCheck size={13} /> Tasdiqlangan</span>}</div><h1>{item.name}</h1><div className="detail-meta"><span><MapPin size={16} /> {item.location}</span><span className="rating"><Star size={15} fill="currentColor" /> {item.rating} <u>{item.reviews} ta sharh</u></span></div></div><button className={`detail-favorite ${isFavorite ? 'selected' : ''}`} onClick={() => toggleFavorite(item.id)}><Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} /> {isFavorite ? 'Saqlangan' : 'Saqlash'}</button></div>
      <p className="detail-description">{item.description}</p>
      <div className="spec-grid"><Spec icon="calendar" label="Ishlab chiqarilgan" value={`${item.year}-yil`} /><Spec icon="power" label="Quvvati" value={item.power} /><Spec icon="capacity" label="Hajmi" value={item.capacity} /><Spec icon="truck" label="Yetkazib berish" value="Kelishiladi" /></div>
      <div className="detail-divider" /><section className="owner-section"><div className="subsection-heading"><div><span className="eyebrow">Asbob egasi</span><h2>Egasi haqida</h2></div><button className="text-button" onClick={contactOwner}>Arendator bilan yozishish <MessageCircle size={15} /></button></div><div className="owner-card"><span className="avatar avatar-large">{item.ownerAvatar}</span><span className="owner-info"><strong>{item.owner}</strong><small><ShieldCheck size={13} /> Tasdiqlangan egasi · 2021-yildan beri</small></span><span className="owner-stats"><b><Star size={14} fill="currentColor" /> 4.9</b><small>18 ta sharh</small></span><ArrowRight size={17} /></div></section>
      <section className="location-section"><div className="subsection-heading"><div><span className="eyebrow">Joylashuv</span><h2>Asbob qayerda?</h2></div><button className="text-button" onClick={() => notify('Xarita yangi oynada ochiladi.')}>Xaritada ko‘rish <ArrowUpRight size={15} /></button></div><div className="map-preview"><div className="map-roads"><i /><i /><i /><i /><i /><span className="map-pin"><MapPin size={19} /></span></div><div className="map-label"><span><MapPin size={15} /><b>{item.location}</b></span><small>Aniq manzil bandlov tasdiqlangandan so‘ng beriladi</small></div></div></section>\n      <section className="reviews-section"><div className="subsection-heading"><div><span className="eyebrow">Mijozlar fikri</span><h2>So‘nggi sharhlar <small>(18)</small></h2></div><button className="text-button">Barchasini ko‘rish <ArrowRight size={15} /></button></div><div className="review-grid"><Review initials="DS" name="Diyorbek S." date="2 kun oldin" text="Asbob holati rasmlardagidan ham yaxshi ekan. Egasi vaqtida olib keldi, operator ham juda tajribali." rating="5.0" /><Review initials="MA" name="Madina A." date="1 hafta oldin" text="Juda qulay servis. Bron qilish tez bo‘ldi, kelishilgan narxda hech qanday qo‘shimcha to‘lov bo‘lmadi." rating="4.8" /></div></section>
    </div><aside className="booking-card"><div className="booking-price"><span><b>{formatPrice(item.price)}</b><small>/ kuniga</small></span><span className="booking-rating"><Star size={15} fill="currentColor" /> {item.rating}</span></div><div className="booking-card-divider" /><div className="booking-form-title">Ijara muddatini tanlang</div><div className="date-inputs"><label><small>Boshlanish kuni</small><span><CalendarDays size={16} /><input type="date" min={dateISO(0)} value={start} onChange={(e) => setStart(e.target.value)} /></span></label><label><small>Tugash kuni</small><span><CalendarDays size={16} /><input type="date" value={end} min={start} onChange={(e) => setEnd(e.target.value)} /></span></label></div><div className="availability-calendar"><div className="calendar-top"><button><ChevronLeft size={15} /></button><strong>Sentabr 2026</strong><button><ChevronRight size={15} /></button></div><div className="calendar-week"><span>Du</span><span>Se</span><span>Cho</span><span>Pa</span><span>Ju</span><span>Sha</span><span>Ya</span></div><div className="calendar-days">{['31','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','1','2','3','4'].map((day, index) => <span key={`${day}-${index}`} className={`${index < 1 || index > 30 ? 'muted' : ''} ${['16','17','18'].includes(day) ? 'selected-day' : ''} ${['22','23'].includes(day) ? 'booked-day' : ''}`}>{day}</span>)}</div><div className="calendar-legend"><span><i className="selected-dot" /> Siz tanladingiz</span><span><i className="booked-dot" /> Band</span></div></div><div className="booking-summary"><span>{formatPrice(item.price)} × {days} kun</span><b>{formatPrice(total)}</b></div><p className="booking-note"><ShieldCheck size={14} /> To‘lov faqat egasi tasdiqlaganidan so‘ng amalga oshiriladi</p><button className="primary-button full-button" onClick={() => createBooking({ start, end, days, total, payment: 'Payme' })}>Band qilish <ArrowRight size={17} /></button><button className="secondary-button full-button" onClick={() => setBookingOpen(true)}>Batafsil so‘rov yuborish</button><div className="safe-note"><LockKeyhole size={13} /> Xavfsiz va ishonchli bron</div></aside></div>
  </section>;
}

function Spec({ icon, label, value }) { const Icon = icon === 'calendar' ? CalendarDays : icon === 'power' ? Zap : icon === 'capacity' ? Package : Truck; return <div className="spec-item"><span><Icon size={18} /></span><small>{label}</small><strong>{value}</strong></div>; }
function Review({ initials, name, date, text, rating }) { return <div className="review-card"><div className="review-head"><span className="avatar">{initials}</span><span><strong>{name}</strong><small>{date}</small></span><b><Star size={13} fill="currentColor" /> {rating}</b></div><p>“{text}”</p></div>; }

function BookingModal({ item, close, confirm }) {
  const [start, setStart] = useState(() => dateISO(2)); const [end, setEnd] = useState(() => dateISO(4)); const [payment, setPayment] = useState('Payme'); const days = calculateDays(start, end); const total = days * item.price;
  return <Modal close={close} title="Band qilish so‘rovi" subtitle="Ma’lumotlarni tekshirib, so‘rovni yuboring."><div className="modal-equipment"><img src={item.image} alt="" /><span><strong>{item.name}</strong><small><MapPin size={13} /> {item.location}</small></span><b>{formatPrice(item.price)}<small>/ kuniga</small></b></div><div className="modal-form-grid"><label>Qabul qilish sanasi<input type="date" min={dateISO(0)} value={start} onChange={(e) => setStart(e.target.value)} /></label><label>Qaytarish sanasi<input type="date" min={start} value={end} onChange={(e) => setEnd(e.target.value)} /></label></div><label className="modal-label">To‘lov usuli</label><div className="payment-options"><button className={payment === 'Payme' ? 'selected' : ''} onClick={() => setPayment('Payme')}><span className="payme-logo">P</span><span><b>Payme</b><small>To‘lov tasdiqdan keyin</small></span>{payment === 'Payme' && <CheckCircle2 size={17} />}</button><button className={payment === 'Click' ? 'selected' : ''} onClick={() => setPayment('Click')}><span className="click-logo">C</span><span><b>Click</b><small>To‘lov tasdiqdan keyin</small></span>{payment === 'Click' && <CheckCircle2 size={17} />}</button><button className={payment === 'Naqd' ? 'selected' : ''} onClick={() => setPayment('Naqd')}><span className="cash-logo"><WalletCards size={18} /></span><span><b>Naqd pul</b><small>Asbob egasi bilan kelishiladi</small></span>{payment === 'Naqd' && <CheckCircle2 size={17} />}</button></div><div className="modal-total"><span>Jami ({days} kun)</span><strong>{formatPrice(total)}</strong></div><button className="primary-button full-button" onClick={() => confirm({ start, end, days, total, payment })}>So‘rovni yuborish <ArrowRight size={17} /></button><p className="modal-terms">So‘rov yuborish orqali foydalanish shartlariga rozilik bildirasiz.</p></Modal>;
}

function ListingModal({ close, submit }) {
  const [form, setForm] = useState({ name: '', category: 'Shurupovyor', location: 'Toshkent shahri', price: '', year: '2024', power: '', capacity: '', description: '', image: '', imageName: '', mediaType: '' });
  const [uploadError, setUploadError] = useState('');
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const chooseFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const allowed = file.type.startsWith('image/') || file.type.startsWith('video/');
    if (!allowed) { setUploadError('Faqat JPG, PNG yoki MP4 fayl tanlang.'); return; }
    if (file.size > 10 * 1024 * 1024) { setUploadError('Fayl hajmi 10 MB dan oshmasin.'); return; }
    setUploadError('');
    setForm((current) => ({ ...current, image: file.type.startsWith('image/') ? URL.createObjectURL(file) : '', imageName: file.name, mediaType: file.type }));
  };
  const presets = ['Gipsokarton montaji', 'Beton va g‘isht', 'Metall kesish', 'Uy ta’miri'];
  return <Modal close={close} title="Yangi e’lon joylash" subtitle="Asbobingiz haqida aniq ma’lumot bering — mijozlar tezroq topadi.">
    <div className="listing-progress"><span className="active"><b>1</b> Ma’lumotlar</span><i /><span><b>2</b> Rasm</span><i /><span><b>3</b> Tekshirish</span></div>
    <div className="listing-helper"><Info size={15} /><span><b>Yaxshi e’lon ko‘proq band qilinadi.</b><small>Asbob nomi, aniq narx va yaxshi rasm qo‘shing.</small></span></div>
    <div className="modal-form-grid">
      <label>Asbob nomi *<input placeholder="Masalan, Bosch GBH 2-28" value={form.name} onChange={(e) => update('name', e.target.value)} /></label>
      <label>Kategoriya *<select value={form.category} onChange={(e) => update('category', e.target.value)}>{allCategories.map((item) => <option key={item.short}>{item.short}</option>)}</select></label>
      <label>Joylashuv *<select value={form.location} onChange={(e) => update('location', e.target.value)}><option>Toshkent shahri</option><option>Toshkent viloyati</option><option>Samarqand shahri</option><option>Farg‘ona viloyati</option><option>Andijon viloyati</option><option>Qashqadaryo viloyati</option></select></label>
      <label>Kunlik narx *<div className="input-with-suffix"><input type="number" placeholder="120 000" value={form.price} onChange={(e) => update('price', e.target.value)} /><span>so‘m</span></div></label>
      <label>Ishlab chiqarilgan yil<input type="number" value={form.year} onChange={(e) => update('year', e.target.value)} /></label>
      <label>Quvvati<input placeholder="Masalan, 880 W" value={form.power} onChange={(e) => update('power', e.target.value)} /></label>
      <label>Hajmi / imkoniyati<input placeholder="Masalan, 28 mm" value={form.capacity} onChange={(e) => update('capacity', e.target.value)} /></label>
    </div>
    <label className="full-label">Qisqa tavsif<textarea rows="3" placeholder="Asbob holati, qanday ishlarga mosligi..." value={form.description} onChange={(e) => update('description', e.target.value)} /></label>
    <div className="description-presets"><small>Tayyor qo‘shish:</small>{presets.map((preset) => <button type="button" key={preset} onClick={() => update('description', `${preset} uchun yaxshi holatda. Toza va ishlashga tayyor.`)}>{preset}</button>)}</div>
    <label className="upload-zone"><input type="file" accept="image/*,video/*" onChange={chooseFile} />{form.image ? <img className="upload-preview" src={form.image} alt="Tanlangan asbob" /> : <UploadCloud size={23} />}<strong>{form.imageName || 'Rasm va videolarni shu yerga tashlang'}</strong><small>yoki <u>kompyuterdan tanlang</u> · JPG, PNG, MP4 · 10 MB gacha</small>{uploadError && <em className="upload-error">{uploadError}</em>}</label>
    <div className="modal-actions"><button className="secondary-button" onClick={close}>Bekor qilish</button><button className="primary-button" disabled={!form.name.trim() || !form.price || Number(form.price) <= 0} onClick={() => submit(form)}>E’lonni davom ettirish <ArrowRight size={16} /></button></div>
  </Modal>;
}

function RegionModal({ value, close, select }) {
  const [query, setQuery] = useState('');
  const visibleRegions = regions.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));
  return <Modal close={close} title="Hududingizni tanlang" subtitle="Sizga yaqin asboblar va arendatorlarni topamiz."><div className="region-modal-search"><Search size={17} /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Viloyat yoki shaharni qidiring" /></div><div className="region-list">{visibleRegions.map((region) => <button key={region.name} className={value === region.name ? 'active' : ''} onClick={() => select(region.name)}><span className="region-list-icon"><MapPin size={16} /></span><span><b>{region.name}</b><small>{region.count} ta e’lon mavjud</small></span>{value === region.name && <CheckCircle2 size={18} />}</button>)}</div></Modal>;
}

function AuthModal({ close, notify, onSuccess }) {
  const [tab, setTab] = useState('login');
  const [identifier, setIdentifier] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const valid = identifier.trim().length >= 5 && password.length >= 6 && (tab === 'login' || name.trim().length >= 2);
  const submitAuth = () => {
    if (!identifier.trim()) return setError('Telefon raqami yoki emailni kiriting.');
    if (tab === 'signup' && name.trim().length < 2) return setError('Ism va familiyangizni kiriting.');
    if (password.length < 6) return setError('Parol kamida 6 ta belgidan iborat bo‘lsin.');
    onSuccess();
  };
  return <Modal close={close} title={tab === 'login' ? 'Xush kelibsiz' : 'Hisob yarating'} subtitle={tab === 'login' ? 'Band qilish va arendator bilan yozishish uchun kiring.' : 'Asbob ijarasi hamjamiyatiga qo‘shiling.'}>
    <div className="auth-tabs"><button className={tab === 'login' ? 'active' : ''} onClick={() => { setTab('login'); setError(''); }}>Kirish</button><button className={tab === 'signup' ? 'active' : ''} onClick={() => { setTab('signup'); setError(''); }}>Ro‘yxatdan o‘tish</button></div>
    <div className="security-note"><ShieldCheck size={15} /><span><b>Ma’lumotlaringiz himoyalangan</b><small>Biz parolni chat yoki xabarlarda hech qachon so‘ramaymiz.</small></span></div>
    <label className="full-label">Telefon raqami yoki email<input autoComplete="username" value={identifier} onChange={(event) => { setIdentifier(event.target.value); setError(''); }} placeholder="+998 90 123 45 67" /></label>
    {tab === 'signup' && <label className="full-label">To‘liq ism<input autoComplete="name" value={name} onChange={(event) => { setName(event.target.value); setError(''); }} placeholder="Ismingiz va familiyangiz" /></label>}
    <label className="full-label">Parol<div className="input-with-icon"><input autoComplete={tab === 'login' ? 'current-password' : 'new-password'} type="password" value={password} onChange={(event) => { setPassword(event.target.value); setError(''); }} placeholder="Kamida 6 ta belgi" /><LockKeyhole size={16} /></div></label>
    {error && <p className="form-error" role="alert"><Info size={14} /> {error}</p>}
    {tab === 'login' && <button className="forgot-link">Parolni unutdingizmi?</button>}
    <button className="primary-button full-button" disabled={!valid} onClick={submitAuth}>{tab === 'login' ? 'Hisobga kirish' : 'Hisob yaratish'} <ArrowRight size={17} /></button>
    <div className="or-divider"><span>yoki</span></div><button className="google-button" onClick={onSuccess}><span>G</span> Google orqali davom etish</button><p className="modal-terms">Davom etish orqali foydalanish shartlari va maxfiylik siyosatiga rozilik bildirasiz.</p>
  </Modal>;
}

function Modal({ close, title, subtitle, children }) { return <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}><div className="modal" role="dialog" aria-modal="true" aria-label={title}><button className="modal-close" aria-label="Oynani yopish" onClick={close}><X size={19} /></button><div className="modal-heading"><span className="modal-kicker"><Sparkles size={13} /> ArendaTexnika</span><h2>{title}</h2><p>{subtitle}</p></div>{children}</div></div>; }

function Dashboard({ bookings, equipment, goTo, setListingOpen, notify, initialTab = 'overview' }) {
  const [tab, setTab] = useState(initialTab);
  const myListings = equipment.filter((item) => item.owner === 'Murod Karimov');
  return <section className="dashboard-page page-width"><div className="dashboard-welcome"><div><span className="eyebrow">12 sentabr, 2026 · Juma</span><h1>Xush kelibsiz, Murod <span>👋</span></h1><p>Loyihalaringiz va ijaralaringizni bir joydan boshqaring.</p></div><button className="primary-button" onClick={() => setListingOpen(true)}><Plus size={17} /> E’lon joylash</button></div><div className="dashboard-layout"><aside className="dashboard-sidebar"><div className="profile-mini"><span className="avatar avatar-large">MK</span><span><strong>Murod Karimov</strong><small>Ijarachi va egasi</small></span><button><MoreHorizontal size={17} /></button></div><nav className="dashboard-nav"><button className={tab === 'overview' ? 'active' : ''} onClick={() => setTab('overview')}><LayoutDashboard size={17} /> Umumiy ko‘rinish</button><button className={tab === 'listings' ? 'active' : ''} onClick={() => setTab('listings')}><Package size={17} /> Mening e’lonlarim <b>{myListings.length}</b></button><button className={tab === 'bookings' ? 'active' : ''} onClick={() => setTab('bookings')}><CalendarCheck2 size={17} /> Buyurtmalarim <b>{bookings.length}</b></button><button className={tab === 'messages' ? 'active' : ''} onClick={() => setTab('messages')}><MessageCircle size={17} /> Xabarlar <b className="green-count">3</b></button><button className={tab === 'payments' ? 'active' : ''} onClick={() => setTab('payments')}><WalletCards size={17} /> To‘lovlar tarixi</button></nav><div className="dashboard-sidebar-bottom"><button onClick={() => notify('Profil sozlamalari tez orada qo‘shiladi.')}><Settings size={17} /> Sozlamalar</button><button onClick={() => goTo('admin')}><BarChart3 size={17} /> Admin panel</button></div></aside><div className="dashboard-content">{tab === 'overview' && <DashboardOverview bookings={bookings} myListings={myListings} setTab={setTab} notify={notify} />}{tab === 'listings' && <ListingsTab listings={myListings} setListingOpen={setListingOpen} notify={notify} />}{tab === 'bookings' && <BookingsTab bookings={bookings} />}{tab === 'messages' && <MessagesTab />}{tab === 'payments' && <PaymentsTab bookings={bookings} />}</div></div></section>;
}

function DashboardOverview({ bookings, myListings, setTab, notify }) {
  return <><div className="dashboard-stat-grid"><StatCard icon={CalendarCheck2} color="blue" label="Faol ijaralar" value="2 ta" note="+1 bu oyda" /><StatCard icon={Package} color="orange" label="Faol e’lonlar" value={`${myListings.length || 0} ta`} note="Moderatsiyada 1 ta" /><StatCard icon={CircleDollarSign} color="green" label="Bu oydagi daromad" value="18.4 mln" note="+12.8% o‘tgan oyga" /><StatCard icon={Star} color="purple" label="O‘rtacha reyting" value="4.9" note="18 ta sharh" /></div><div className="dashboard-panels"><section className="panel-card activity-panel"><div className="panel-heading"><div><span className="eyebrow">So‘nggi faoliyat</span><h2>Buyurtmalar tarixi</h2></div><button className="text-button" onClick={() => setTab('bookings')}>Barchasini ko‘rish <ArrowRight size={15} /></button></div>{bookings.slice(0, 3).map((booking) => <BookingRow key={booking.id} booking={booking} />)}</section><section className="panel-card earnings-panel"><div className="panel-heading"><div><span className="eyebrow">Daromad</span><h2>Oylik ko‘rsatkich</h2></div><button className="icon-button light"><MoreHorizontal size={17} /></button></div><div className="earnings-total"><strong>18.4 mln <small>so‘m</small></strong><span className="positive"><ArrowUpRight size={14} /> 12.8%</span></div><MiniChart /><div className="chart-labels"><span>Apr</span><span>May</span><span>Iyun</span><span>Iyul</span><span>Avg</span><span>Sen</span></div></section></div><section className="panel-card quick-panel"><div className="panel-heading"><div><span className="eyebrow">Tezkor harakatlar</span><h2>Nima qilmoqchisiz?</h2></div></div><div className="quick-actions"><button onClick={() => setTab('listings')}><span className="quick-icon orange"><Plus size={19} /></span><span><b>Asbob qo‘shish</b><small>Yangi e’lon yarating</small></span><ArrowRight size={16} /></button><button onClick={() => notify('Katalog ochildi.')}><span className="quick-icon blue"><Search size={19} /></span><span><b>Texnika qidirish</b><small>Loyihangizga mosini toping</small></span><ArrowRight size={16} /></button><button onClick={() => setTab('messages')}><span className="quick-icon green"><MessageCircle size={19} /></span><span><b>Xabarlarni ko‘rish</b><small>3 ta o‘qilmagan xabar</small></span><ArrowRight size={16} /></button></div></section></>;
}
function StatCard({ icon: Icon, color, label, value, note }) { return <div className="stat-card"><span className={`stat-icon ${color}`}><Icon size={19} /></span><span className="stat-label">{label}</span><strong>{value}</strong><small className={note.startsWith('+') ? 'positive' : ''}>{note}</small></div>; }
function MiniChart() { return <div className="mini-chart-large"><svg viewBox="0 0 420 100" preserveAspectRatio="none"><defs><linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#89b9ae" stopOpacity=".35" /><stop offset="100%" stopColor="#89b9ae" stopOpacity="0" /></linearGradient></defs><path d="M0,78 C28,70 32,74 60,56 S100,75 126,60 S160,55 184,66 S218,46 244,48 S280,29 300,40 S340,24 360,30 S395,20 420,10 L420,100 L0,100 Z" fill="url(#chartGradient)" /><path d="M0,78 C28,70 32,74 60,56 S100,75 126,60 S160,55 184,66 S218,46 244,48 S280,29 300,40 S340,24 360,30 S395,20 420,10" fill="none" stroke="#438b7d" strokeWidth="3" strokeLinecap="round" /></svg></div>; }
function BookingRow({ booking }) { return <div className="booking-row"><img src={booking.equipment.image} alt="" /><span className="booking-row-info"><strong>{booking.equipment.name}</strong><small><CalendarDays size={13} /> {booking.start} — {booking.end}</small></span><span className={`status ${booking.status === 'Yakunlandi' ? 'done' : booking.status === 'Kutilmoqda' ? 'pending' : 'confirmed'}`}><i /> {booking.status}</span><b>{formatPrice(booking.total)}</b><button><MoreHorizontal size={17} /></button></div>; }
function ListingsTab({ listings, setListingOpen, notify }) { return <><div className="content-heading"><div><span className="eyebrow">Sizning texnikalaringiz</span><h2>Mening e’lonlarim</h2><p>Asboblaringizni boshqaring va bandlovlarni kuzating.</p></div><button className="primary-button" onClick={() => setListingOpen(true)}><Plus size={17} /> E’lon joylash</button></div>{listings.length ? <div className="my-listings-table">{listings.map((item) => <div className="my-listing-row" key={item.id}><img src={item.image} alt="" /><span><strong>{item.name}</strong><small><MapPin size={13} /> {item.location}</small></span><b>{formatPrice(item.price)}<small>/ kuniga</small></b><span className="status confirmed"><i /> Faol</span><button onClick={() => notify('E’lon tahrirlash oynasi tez orada.')}><Edit3 size={16} /></button><button onClick={() => notify('E’lon menyusi')}><MoreHorizontal size={17} /></button></div>)}</div> : <div className="empty-dashboard"><Package size={28} /><h3>Hali e’lonlar yo‘q</h3><p>Asbobingizni joylang va ijaraga berishni boshlang.</p><button className="primary-button" onClick={() => setListingOpen(true)}><Plus size={16} /> Birinchi e’lonni joylash</button></div>}</>; }
function BookingsTab({ bookings }) { return <><div className="content-heading"><div><span className="eyebrow">Ijaralar</span><h2>Mening buyurtmalarim</h2><p>Barcha bandlovlar va ularning holati.</p></div><button className="outline-button"><Filter size={15} /> Filtrlash</button></div><div className="bookings-list">{bookings.map((booking) => <BookingRow key={booking.id} booking={booking} />)}</div></>; }
function MessagesTab() { return <><div className="content-heading"><div><span className="eyebrow">Aloqa</span><h2>Xabarlar</h2><p>Asbob egalari va mijozlar bilan yozishing.</p></div><button className="primary-button"><Plus size={16} /> Yangi xabar</button></div><div className="messages-panel"><div className="conversation-list"><div className="conversation-search"><Search size={15} /><input placeholder="Xabarlarni qidirish" /></div><Conversation initials="SM" name="Sardor Mamatov" message="Salom, asbob 18-sentabrga tayyor..." time="12:42" active unread /><Conversation initials="BT" name="Bekzod Transport" message="To‘lov bo‘yicha savolingizga javob..." time="Kecha" /><Conversation initials="ER" name="Energo Rent" message="Rahmat, kelishdik." time="10 sen" /></div><div className="chat-window"><div className="chat-head"><span className="avatar">SM</span><span><strong>Sardor Mamatov</strong><small><i /> Hozir onlayn</small></span><button><MoreHorizontal size={18} /></button></div><div className="chat-body"><span className="chat-date">BUGUN</span><div className="message received">Assalomu alaykum! Bosch perforatori bo‘yicha so‘rovingizni ko‘rdim.<small>12:38</small></div><div className="message received">18–20 sentabr kunlari asbob bo‘sh. Operator bilan kerakmi?<small>12:39</small></div><div className="message sent">Va alaykum assalom. Ha, operator bilan bo‘lsin. Narx ichiga yetkazib berish ham kiradimi?<small>12:41 <Check size={12} /></small></div></div><div className="chat-input"><button><Plus size={18} /></button><input placeholder="Xabar yozing..." /><button className="send-button"><Send size={16} /></button></div></div></div></>; }
function Conversation({ initials, name, message, time, active, unread }) { return <button className={`conversation ${active ? 'active' : ''}`}><span className="avatar">{initials}</span><span><strong>{name}</strong><small>{message}</small></span><time>{time}</time>{unread && <i className="unread-dot" />}</button>; }
function PaymentsTab({ bookings }) { return <><div className="content-heading"><div><span className="eyebrow">Moliya</span><h2>To‘lovlar tarixi</h2><p>Barcha to‘lovlar va hisob-fakturalar.</p></div><button className="outline-button"><WalletCards size={15} /> Hisob raqamlari</button></div><div className="payment-summary"><div><span className="stat-icon green"><CircleDollarSign size={19} /></span><small>Jami to‘langan</small><strong>13.95 mln so‘m</strong></div><div><span className="stat-icon blue"><CreditCard size={19} /></span><small>To‘lovlar soni</small><strong>8 ta</strong></div><div><span className="stat-icon orange"><Clock3 size={19} /></span><small>Kutilayotgan</small><strong>9.6 mln so‘m</strong></div></div><div className="payments-table"><div className="table-head"><span>To‘lov</span><span>Sana</span><span>Usul</span><span>Summa</span><span>Holat</span></div>{bookings.map((booking) => <div className="table-row" key={booking.id}><span><b>#{booking.id}</b><small>{booking.equipment.name}</small></span><span>12 sen 2026</span><span><CreditCard size={14} /> {booking.payment}</span><strong>{formatPrice(booking.total)}</strong><span className={`status ${booking.status === 'Yakunlandi' ? 'done' : 'pending'}`}><i /> {booking.status === 'Yakunlandi' ? 'To‘langan' : 'Kutilmoqda'}</span></div>)}</div></>; }

function Admin({ equipment, bookings, notify }) { const [adminTab, setAdminTab] = useState('overview'); return <section className="admin-page"><div className="admin-topbar"><div className="page-width admin-topbar-inner"><div><span className="admin-kicker"><BarChart3 size={14} /> Boshqaruv markazi</span><h1>Admin panel</h1><p>ArendaTexnika platformasini bir joydan nazorat qiling.</p></div><div className="admin-date"><CalendarDays size={16} /> 12 sentabr 2026 <button onClick={() => notify('Hisobot yuklanmoqda...')}><ArrowUpRight size={16} /> Hisobot</button></div></div></div><div className="page-width admin-layout"><aside className="admin-sidebar"><div className="admin-company"><span className="brand-mark"><img src="/assets/arendatexnika-logo.png" alt="" /></span><span><strong>Arenda</strong><em>Texnika</em><small>Administrator</small></span></div><span className="admin-nav-label">ASOSIY</span><button className={adminTab === 'overview' ? 'active' : ''} onClick={() => setAdminTab('overview')}><LayoutDashboard size={17} /> Umumiy ko‘rinish</button><button className={adminTab === 'users' ? 'active' : ''} onClick={() => setAdminTab('users')}><Users size={17} /> Foydalanuvchilar <b>2.4k</b></button><button className={adminTab === 'listings' ? 'active' : ''} onClick={() => setAdminTab('listings')}><Package size={17} /> E’lonlar <b>18</b></button><button className={adminTab === 'orders' ? 'active' : ''} onClick={() => setAdminTab('orders')}><CalendarCheck2 size={17} /> Buyurtmalar</button><span className="admin-nav-label">BOSHQARUV</span><button onClick={() => notify('Kategoriyalar boshqaruvi')}><ListFilter size={17} /> Kategoriyalar</button><button onClick={() => notify('Sharhlar moderatsiyasi')}><MessageCircle size={17} /> Sharhlar <b className="alert-count">6</b></button><button onClick={() => notify('Bildirishnoma yaratish')}><MegaphoneIcon /> Bildirishnomalar</button><div className="admin-sidebar-bottom"><button><Settings size={17} /> Sozlamalar</button><button><ArrowRight size={17} /> Saytga qaytish</button></div></aside><div className="admin-content">{adminTab === 'overview' && <AdminOverview equipment={equipment} bookings={bookings} notify={notify} />}{adminTab === 'users' && <AdminUsers notify={notify} />}{adminTab === 'listings' && <AdminListings equipment={equipment} notify={notify} />}{adminTab === 'orders' && <AdminOrders bookings={bookings} notify={notify} />}</div></div></section>; }
function MegaphoneIcon() { return <span className="custom-megaphone">◈</span>; }
function AdminOverview({ equipment, bookings, notify }) { return <><div className="admin-heading"><div><span className="eyebrow">Bugungi ko‘rsatkichlar</span><h2>Salom, administrator <span>✦</span></h2><p>Platformangizdagi eng muhim yangiliklar shu yerda.</p></div><button className="dark-button" onClick={() => notify('Yangi e’lonlar ko‘rib chiqilmoqda.')}>Moderatsiyani ko‘rish <ArrowRight size={16} /></button></div><div className="admin-stat-grid"><AdminStat icon={Users} label="Jami foydalanuvchilar" value="2,428" change="+8.2%" color="blue" /><AdminStat icon={Package} label="Faol e’lonlar" value="1,204" change="+4.6%" color="orange" /><AdminStat icon={CircleDollarSign} label="Umumiy daromad" value="284.6 mln" change="+12.4%" color="green" /><AdminStat icon={CalendarCheck2} label="Faol buyurtmalar" value="86" change="+18.1%" color="purple" /></div><div className="admin-main-grid"><section className="admin-panel chart-panel"><div className="panel-heading"><div><span className="eyebrow">Platforma daromadi</span><h2>Daromad analitikasi</h2></div><select><option>So‘nggi 6 oy</option><option>Bu yil</option></select></div><div className="admin-chart"><div className="chart-y"><span>80 mln</span><span>60 mln</span><span>40 mln</span><span>20 mln</span><span>0</span></div><div className="chart-area"><div className="chart-grid-lines"><i /><i /><i /><i /><i /></div><svg viewBox="0 0 600 220" preserveAspectRatio="none"><defs><linearGradient id="adminGradient" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#4e9688" stopOpacity=".32" /><stop offset="100%" stopColor="#4e9688" stopOpacity="0" /></linearGradient></defs><path d="M0,178 C30,180 46,145 82,154 S125,138 152,148 S186,110 214,124 S248,102 275,114 S312,73 340,94 S380,64 408,79 S446,38 472,58 S518,44 548,49 S578,22 600,28 L600,220 L0,220 Z" fill="url(#adminGradient)" /><path d="M0,178 C30,180 46,145 82,154 S125,138 152,148 S186,110 214,124 S248,102 275,114 S312,73 340,94 S380,64 408,79 S446,38 472,58 S518,44 548,49 S578,22 600,28" fill="none" stroke="#4e9688" strokeWidth="3" /></svg><div className="chart-x"><span>Apr</span><span>May</span><span>Iyun</span><span>Iyul</span><span>Avg</span><span>Sen</span></div></div></div></section><section className="admin-panel category-performance"><div className="panel-heading"><div><span className="eyebrow">Tahlil</span><h2>Top kategoriyalar</h2></div><button className="icon-button light"><MoreHorizontal size={17} /></button></div><div className="donut-wrap"><div className="donut-chart"><strong>1,204<small>e’lon</small></strong></div><div className="donut-legend"><span><i className="dot-sand" /> Shurupovyortlar <b>34%</b></span><span><i className="dot-blue" /> Perforatorlar <b>22%</b></span><span><i className="dot-orange" /> Bolgarkalar <b>19%</b></span><span><i className="dot-gray" /> Boshqa <b>25%</b></span></div></div></section></div><section className="admin-panel moderation-panel"><div className="panel-heading"><div><span className="eyebrow">E’tibor talab qiladi</span><h2>Moderatsiya navbati <span className="heading-count">8</span></h2></div><button className="text-button" onClick={() => notify('Barcha e’lonlar ochildi.')}>Barchasini ko‘rish <ArrowRight size={15} /></button></div><div className="moderation-list">{equipment.slice(0, 4).map((item, index) => <div className="moderation-row" key={item.id}><img src={item.image} alt="" /><span><strong>{item.name}</strong><small>{index % 2 === 0 ? 'Yangi e’lon' : 'Rasm yangilangan'} · {index + 1} soat oldin</small></span><span className="moderation-owner"><span className="avatar avatar-tiny">{item.ownerAvatar}</span>{item.owner}</span><button className="icon-button light" onClick={() => notify(`${item.name} ko‘rib chiqilmoqda`)}><Eye size={16} /></button><button className="icon-button light" onClick={() => notify('E’lon tasdiqlandi')}><Check size={16} /></button></div>)}</div></section></>; }
function AdminStat({ icon: Icon, label, value, change, color }) { return <div className="admin-stat"><span className={`stat-icon ${color}`}><Icon size={19} /></span><span><small>{label}</small><strong>{value}</strong></span><b className="positive"><ArrowUpRight size={13} /> {change}</b></div>; }
function AdminUsers({ notify }) { const users = [['AK', 'Azizbek Qurbonov', 'azizbek@mail.uz', 'Egasi', 'Faol'], ['SM', 'Sardor Mamatov', 'sardor@mail.uz', 'Ijarachi', 'Faol'], ['BT', 'Bekzod Transport', 'info@bekzod.uz', 'Biznes', 'Faol'], ['NA', 'Nodira Abdullayeva', 'nodira@mail.uz', 'Ijarachi', 'Tekshiruvda']]; return <><div className="admin-heading compact"><div><span className="eyebrow">2,428 ta akkaunt</span><h2>Foydalanuvchilar</h2><p>Platformadagi barcha foydalanuvchilarni boshqaring.</p></div><button className="dark-button" onClick={() => notify('Foydalanuvchi qo‘shish oynasi') }><Plus size={16} /> Foydalanuvchi qo‘shish</button></div><div className="admin-table-wrap"><div className="admin-table-toolbar"><div className="table-search"><Search size={16} /><input placeholder="Ism yoki email bo‘yicha qidiring" /></div><button className="outline-button"><Filter size={15} /> Filtr</button></div><div className="admin-table"><div className="admin-table-head"><span>Foydalanuvchi</span><span>Rol</span><span>Ro‘yxatdan o‘tgan</span><span>Holat</span><span /></div>{users.map((user, index) => <div className="admin-table-row" key={user[1]}><span className="table-user"><span className="avatar">{user[0]}</span><span><b>{user[1]}</b><small>{user[2]}</small></span></span><span>{user[3]}</span><span>{12 - index} sen 2026</span><span className={`status ${user[4] === 'Faol' ? 'confirmed' : 'pending'}`}><i /> {user[4]}</span><button onClick={() => notify('Foydalanuvchi amallari')}><MoreHorizontal size={17} /></button></div>)}</div></div></>; }
function AdminListings({ equipment, notify }) { return <><div className="admin-heading compact"><div><span className="eyebrow">1,204 ta e’lon</span><h2>E’lonlarni boshqarish</h2><p>Yangi e’lonlarni tekshiring va platformani tartibli saqlang.</p></div><button className="outline-button"><Filter size={15} /> Filtrlar</button></div><div className="admin-table-wrap"><div className="admin-table-toolbar"><div className="table-search"><Search size={16} /><input placeholder="Asbob nomi bo‘yicha qidiring" /></div><span className="table-toolbar-note"><i /> 8 ta moderatsiyada</span></div><div className="admin-listing-table">{equipment.map((item) => <div className="admin-listing-row" key={item.id}><img src={item.image} alt="" /><span><b>{item.name}</b><small><MapPin size={12} /> {item.location}</small></span><span>{item.category}</span><strong>{formatPrice(item.price)}<small>/ kuniga</small></strong><span className="status confirmed"><i /> Faol</span><button onClick={() => notify(`${item.name} tahrirlash`)}><Edit3 size={15} /></button></div>)}</div></div></>; }
function AdminOrders({ bookings, notify }) { return <><div className="admin-heading compact"><div><span className="eyebrow">86 ta buyurtma</span><h2>Buyurtmalar</h2><p>Barcha bandlovlar holatini kuzating.</p></div><button className="outline-button"><Filter size={15} /> Filtrlar</button></div><div className="admin-table-wrap"><div className="admin-table"><div className="admin-table-head orders"><span>Buyurtma</span><span>Mijoz</span><span>Asbob</span><span>Sana</span><span>Holat</span><span /></div>{[...bookings, ...bookings].map((booking, index) => <div className="admin-table-row orders" key={`${booking.id}-${index}`}><span><b>#{booking.id}</b><small>12 sen 2026</small></span><span><span className="table-user compact"><span className="avatar avatar-tiny">MK</span><b>Murod Karimov</b></span></span><span>{booking.equipment.name}</span><span>{booking.start}</span><span className={`status ${booking.status === 'Yakunlandi' ? 'done' : 'confirmed'}`}><i /> {booking.status}</span><button onClick={() => notify('Buyurtma tafsilotlari')}><MoreHorizontal size={17} /></button></div>)}</div></div></>; }

function MobileDock({ page, goTo, openFavorites, openAuth, isAuthenticated }) {
  return <nav className="mobile-dock" aria-label="Mobil navigatsiya">
    <button className={page === 'home' ? 'active' : ''} onClick={() => goTo('home')}><LayoutDashboard size={18} /><small>Bosh sahifa</small></button>
    <button className={page === 'catalog' || page === 'detail' ? 'active' : ''} onClick={() => goTo('catalog')}><Search size={18} /><small>Katalog</small></button>
    <button onClick={openFavorites}><Heart size={18} /><small>Sevimli</small></button>
    <button className={page === 'dashboard' ? 'active' : ''} onClick={() => isAuthenticated ? goTo('dashboard') : openAuth()}><UserCircle size={18} /><small>{isAuthenticated ? 'Kabinet' : 'Kirish'}</small></button>
  </nav>;
}

function Footer({ goTo }) { return <footer className="site-footer"><div className="page-width footer-top"><div className="footer-brand"><button className="brand" onClick={() => goTo('home')}><span className="brand-mark"><img src="/assets/arendatexnika-logo.png" alt="" /></span><span><strong>Arenda</strong><em>Texnika</em></span></button><p>Qurilish ishingizga kerakli asbob — bir necha klikda.</p><div className="social-row"><span>in</span><span>f</span><span>tg</span><span>◎</span></div></div><div className="footer-links"><div><strong>Platforma</strong><button onClick={() => goTo('catalog')}>Katalog</button><button>Qanday ishlaydi?</button><button>Asbob joylash</button><button>Hamkorlik</button></div><div><strong>Yordam</strong><button>Yordam markazi</button><button>Foydalanish shartlari</button><button>Maxfiylik siyosati</button><button>Biz bilan bog‘lanish</button></div><div className="footer-contact"><strong>Aloqa</strong><a href="tel:+998712000000"><Phone size={14} /> +998 71 200 00 00</a><a href="mailto:hello@arendatexnika.uz"><Mail size={14} /> hello@arendatexnika.uz</a><small>Toshkent shahri, Yunusobod tumani</small></div></div></div><div className="page-width footer-bottom"><span>© 2026 ArendaTexnika. Barcha huquqlar himoyalangan.</span><span><span className="online-dot" /> Platforma faol</span><span>O‘zbekistonda yaratilgan <span>♥</span></span></div></footer>; }

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error) { console.error('ArendaTexnika UI error:', error); }
  render() {
    if (!this.state.hasError) return this.props.children;
    return <div className="error-screen"><div className="error-card"><span className="error-mark">!</span><h1>Biror narsa xato ketdi</h1><p>Sahifani yangilab ko‘ring. Saqlangan qidiruvlaringiz yo‘qolmaydi.</p><button className="primary-button" onClick={() => window.location.reload()}>Sahifani yangilash <ArrowRight size={16} /></button></div></div>;
  }
}

createRoot(document.getElementById('root')).render(<AppErrorBoundary><App /></AppErrorBoundary>);
