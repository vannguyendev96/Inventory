import React from 'react';

// const Toaster = React.lazy(() => import('./views/notifications/toaster/Toaster'));
// const Tables = React.lazy(() => import('./views/base/tables/Tables'));

// const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'));
// const Cards = React.lazy(() => import('./views/base/cards/Cards'));
// const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'));
// const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'));
// const BasicForms = React.lazy(() => import('./views/base/forms/BasicForms'));

// const Jumbotrons = React.lazy(() => import('./views/base/jumbotrons/Jumbotrons'));
// const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'));
// const Navbars = React.lazy(() => import('./views/base/navbars/Navbars'));
// const Navs = React.lazy(() => import('./views/base/navs/Navs'));
// const Paginations = React.lazy(() => import('./views/base/paginations/Pagnations'));
// const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'));
// const ProgressBar = React.lazy(() => import('./views/base/progress-bar/ProgressBar'));
// const Switches = React.lazy(() => import('./views/base/switches/Switches'));

// const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'));
// const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'));
// const BrandButtons = React.lazy(() => import('./views/buttons/brand-buttons/BrandButtons'));
// const ButtonDropdowns = React.lazy(() => import('./views/buttons/button-dropdowns/ButtonDropdowns'));
// const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'));
// const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'));
// const Charts = React.lazy(() => import('./views/charts/Charts'));

// const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'));
// const Flags = React.lazy(() => import('./views/icons/flags/Flags'));
// const Brands = React.lazy(() => import('./views/icons/brands/Brands'));
// const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'));
// const Badges = React.lazy(() => import('./views/notifications/badges/Badges'));
// const Modals = React.lazy(() => import('./views/notifications/modals/Modals'));
// const Colors = React.lazy(() => import('./views/theme/colors/Colors'));
// const Typography = React.lazy(() => import('./views/theme/typography/Typography'));
// const Widgets = React.lazy(() => import('./views/widgets/Widgets'));
// const Users = React.lazy(() => import('./views/users/Users'));
// const User = React.lazy(() => import('./views/users/User'));


//
const PhieuNhapKho = React.lazy(() => import('./features/user/phieunhapkho'));
const PhieuNhapKhoDanhSach = React.lazy(() => import('./features/user/phieunhapkho-danhsach'));

const PhieuXuatKho = React.lazy(() => import('./features/user/phieuxuatkho'));
const PhieuXuatKhoDanhSach = React.lazy(() => import('./features/user/phieuxuatkho-danhsach'));

const PhieuKiemKe = React.lazy(() => import('./features/user/phieukiemke'));

const KhoHang = React.lazy(() => import('./features/admin/khohang'));
const Report = React.lazy(() => import('./features/admin/lichsuthongke/thongkexuatkho'));
const ReportNhapKho = React.lazy(() => import('./features/admin/lichsuthongke/thongkenhapkho'));
const Quanlytaixe = React.lazy(() => import('./features/admin/quanlitaixe'));
const Quanlyuser = React.lazy(() => import('./features/admin/quanliuser'));




const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: PhieuNhapKho },
  


  { path: '/phieu-nhap-kho', exact: true,  name: 'Phiếu nhập kho', component: PhieuNhapKho },
  { path: '/phieu-nhap-kho-danhsach', exact: true,  name: 'Danh sách phiếu nhập kho', component: PhieuNhapKhoDanhSach },
  { path: '/phieu-xuat-kho', exact: true,  name: 'Phiếu xuất kho', component: PhieuXuatKho },
  { path: '/phieu-xuat-kho-danhsach', exact: true,  name: 'Danh sách phiếu xuất kho', component: PhieuXuatKhoDanhSach },
  { path: '/phieu-kiem-ke', exact: true,  name: 'Phiếu kiểm kê', component: PhieuKiemKe },

  { path: '/kho-hang', exact: true,  name: 'Quản lý kho hàng', component: KhoHang },
  { path: '/thongke-xuatkho', exact: true,  name: 'Thống kê xuất kho', component: Report },
  { path: '/thongke-nhapkho', exact: true,  name: 'Thống kê nhập kho', component: ReportNhapKho },
  { path: '/quanly-taixe', exact: true,  name: 'Quản lý tài xế', component: Quanlytaixe },
  { path: '/quanly-user', exact: true,  name: 'Quản lý thủ kho', component: Quanlyuser },
];

export default routes;
