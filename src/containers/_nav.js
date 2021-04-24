import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'HCMUT',
    to: '/phieu-nhap-kho'
  },
  
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Quản lý xuất nhập kho']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Quản lý nhập kho',
    route: '/phieu-nhap-kho',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Tạo phiếu nhập kho',
        to: '/phieu-nhap-kho',
      }
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Quản lý xuất kho',
    route: '/phieu-xuat-kho',
    icon: 'cil-cursor',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Tạo phiếu xuất kho',
        to: '/phieu-xuat-kho',
      }
    ],
  },
  
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Quản lý kiểm kê',
    route: '/phieu-kiem-ke',
    icon: 'cil-star',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Kiểm kê',
        to: '/phieu-kiem-ke'
      },
    ],
  },
  
]

export default _nav
