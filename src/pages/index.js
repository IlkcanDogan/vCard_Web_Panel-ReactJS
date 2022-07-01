import Home from './home';
import Profile from './profile';
import VCF from './vcf';
import Edit from './edit';
import Json from './json';

const Pages = [
    {
        path: '/',
        title: 'vCard',
        component: Home
    },
    {
        path: '/p/:profileCode',
        title: 'Profile',
        component: Profile
    },
    {
        path: '/vcf/:profileCode',
        title: 'VCF',
        component: VCF
    },
    {
        path: '/p/edit/:profileCode',
        title: 'Düzenle',
        component: Edit
    },
    {
        path: '/json/:profileCode',
        title: 'JSON Dosyası',
        component: Json
    },
]

export default Pages;