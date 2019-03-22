var proxys = [
  {id: Math.random().toString().split('.')[1], host: '165.227.176.17', port: '8080', login: 'petya', password: 'petya123'},
  {id: Math.random().toString().split('.')[1], host: '68.70.255.195', port: '3128', login: 'valera', password: 'valera123'},
  {id: Math.random().toString().split('.')[1], host: '28.20.127', port: '1090', login: 'lesha', password: 'lesha123'},
  {id: Math.random().toString().split('.')[1], host: '24.48.29.13', port: '1580', login: 'dima', password: 'dima123'},
  {id: Math.random().toString().split('.')[1], host: '202.48.20.157', port: '1010', login: 'vova', password: 'vova123'}
];


function findProxyKey (proxyId) {
  for (var key = 0; key < proxys.length; key++) {
    if (proxys[key].id == proxyId) {
      return key;
    }
  }
};


function findProxy (proxyId) {
  return proxys[findProxyKey(proxyId)];
};

var List = Vue.extend({
  template: '#proxy-list',
  data: function () {
    return {
			proxys: proxys,
			proxyMax: 10,
			proxyCurrent: proxys.length,
			disabled: false
		};
  },
	methods:{
		isDisabled: function (e) {
			if(this.proxyMax == this.proxyCurrent){
				this.disabled = true;
				e.preventDefault();
			}
		}
	}
});


var ProxyCreate = Vue.extend({
  template: '#proxy-create',
  data: function () {
    return {proxy: {host: '', port: '', login: '', password: ''}}
  },
  methods: {
    createProxy: function() {
      var proxy = this.proxy;
      proxys.push({
        id: Math.random().toString().split('.')[1],
        host: proxy.host,
        port: proxy.port,
        login: proxy.login,
				password: proxy.password
      });
      router.push('/');
    }
  }
});

var ProxyEdit = Vue.extend({
  template: '#proxy-edit',
  data: function () {
    return {proxy: findProxy(this.$route.params.proxy_id)};
  },
  methods: {
    updateProxy: function () {
      var proxy = this.proxy;
      proxys[findProxyKey(proxy.id)] = {
        id: proxy.id,
        host: proxy.host,
        port: proxy.port,
        login: proxy.login,
				password: proxy.password
      };
      router.push('/');
    }
  }
});

var ProxyDelete = Vue.extend({
  template: '#proxy-delete',
  data: function () {
    return {proxy: findProxy(this.$route.params.proxy_id)};
  },
  methods: {
    deleteProxy: function () {
      proxys.splice(findProxyKey(this.$route.params.proxy_id), 1);
      router.push('/');
    }
  }
});



var router = new VueRouter({
	routes:[
	  { path: '/', component: List},
	  { path: '/proxy-create', component: ProxyCreate},
	  { path: '/proxy/:proxy_id/edit', component: ProxyEdit, name: 'proxy-edit'},
	  { path: '/proxy/:proxy_id/delete', component: ProxyDelete, name: 'proxy-delete'}
	]
});
var vm = new Vue({
  router
}).$mount('#app')
