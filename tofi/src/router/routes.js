const routes = [{
    path: '/',
    component: () =>
        import ('layouts/Navbar.vue'),
    children: [{
        path: '',
        component: () =>
            import ('pages/inventory.vue')
    }, {
        path: 'Inventory',
        component: () =>
            import ('pages/inventory.vue')
    }, {
        path: 'Transaction',
        component: () =>
            import ('pages/transaction.vue')
    }]
}]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
    routes.push({
        path: '*',
        component: () =>
            import ('pages/Error404.vue')
    })
}

export default routes