/* globals Vue */

var vm = new Vue({
  el: '.content-grid',

  data: {
    markets: [
      { id: '1', title: 'Some', brand: 'Nokia', launch: 'september', estSalesUsd: '123', estSalesEur: '234', status: 'Alive' },
      { id: '2', title: 'Other', brand: 'Canon', launch: 'august', estSalesUsd: '750', estSalesEur: '480', status: 'Dead' }
    ],

    market: {
      index: '',
      id: '',
      title: '',
      brand: '',
      launch: '',
      estSalesUsd: '',
      estSalesEur: '',
      status: ''
    },

    mode: 'create'
  },

  methods: {
    addMarket () {
      var data = Object.assign({}, this.market)
      data.id = +this.markets[this.markets.length - 1].id + 1
      this.markets.push(data)

      vm.clearObject()
      vm.clearInputs()
    },

    populateData (index) {
      this.mode = 'edit'
      Object.assign(this.market, this.markets[index])
      this.market.index = index

      var inputs = document.getElementsByClassName('mdl-textfield--floating-label')
      var intputsArray = Array.from(inputs)
      intputsArray.forEach(function (item) {
        item.className += ' is-dirty'
      })
    },

    editMarket () {
      var index = this.market.index
      this.markets.splice(index, 1, JSON.parse(JSON.stringify(this.market)))

      this.mode = 'create'
      vm.clearObject()
      vm.clearInputs()
    },

    removeMarket (index) {
      this.markets.splice(index, 1)
    },

    clearInputs () {
      var inputs = document.getElementById('form').getElementsByClassName('mdl-textfield__input')
      var intputsArray = Array.from(inputs)
      intputsArray.forEach(function (item) {
        item.value = ''
      })

      vm.removeFloatingLabel()
    },

    removeFloatingLabel () {
      var inputs = document.getElementById('form').getElementsByClassName('is-dirty')
      var intputsArray = Array.from(inputs)
      intputsArray.forEach(function (item) {
        item.classList.remove('is-dirty')
      })
    },

    clearObject () {
      for (var i in this.market) {
        this.market[i] = ''
      }
    },

    cancelButton () {
      this.mode = 'create'
      vm.clearObject()
      vm.clearInputs()
    }
  }
})
