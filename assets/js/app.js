var vm = new Vue({
  el: 'body',

  data: {
    markets: [
      { id: '1', title: 'Some', brand: 'Nokia', estSalesUsd: '123$', estSalesChf: '234$', status: 'Alive', action: 'Remove' },
      { id: '1', title: 'Some', brand: 'Nokia', estSalesUsd: '123$', estSalesChf: '234$', status: 'Alive', action: 'Remove' },
      { id: '1', title: 'Some', brand: 'Nokia', estSalesUsd: '123$', estSalesChf: '234$', status: 'Alive', action: 'Remove' },
      { id: '1', title: 'Some', brand: 'Nokia', estSalesUsd: '123$', estSalesChf: '234$', status: 'Alive', action: 'Remove' }
    ]
  },

  methods: {
    addMarket () {
      var self = this
      $("form").on("submit", function (event) {
        event.preventDefault()

        var newId = +self.markets[self.markets.length - 1].id + 1
        var result = $(this).serializeArray()
        var data = {
          id: newId,
          title: result[0].value,
          brand: result[1].value,
          estSalesUsd: result[2].value + '$',
          estSalesChf: '100$',
          status: result[3].value,
          actions: 'Remove'
        }

        self.markets.push(data)
      })
    },

    editMarket (index) {

    },

    removeMarket (index) {
      this.markets.splice(index, 1)
    }
  }
})
