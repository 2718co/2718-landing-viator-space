export type NavLink = {
    label: string;
    path: string;
};

export const navlinks: NavLink[] = [
    // {
    //   label: "Home",
    //   path: "/",
    // },
    {
        label: 'Manifesto',
        path: '/manifesto'
    },
    {
        label: 'Gallery',
        path: '/gallery'
    },
    {
        label: 'Domain',
        path: '/ens/claim'
    }
];
