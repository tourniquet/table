var vm = new Vue({
  el: 'body',

  data: {
    markets: [
      { id: '1', title: 'Some', brand: 'Nokia', launch: 'september', estSalesUsd: '123', estSalesEur: '234', status: 'Alive' },
      { id: '2', title: 'Other', brand: 'Canon', launch: 'august', estSalesUsd: '750', estSalesEur: '480', status: 'Dead' }
    ],

    form: {
      id: '',
      title: '',
      brand: '',
      launch: '',
      estSalesUsd: '',
      estSalesEur: '',
      status: ''
    },

    button: 'add market'
  },

  methods: {
    addMarket () {
      var self = this

      $('form').on('submit', function (event) {
        event.preventDefault()

        var newId = +self.markets[self.markets.length - 1].id + 1
        var result = $(this).serializeArray()
        var data = {
          id: newId,
          title: result[0].value,
          brand: result[1].value,
          launch: result[2].value,
          estSalesUsd: result[3].value,
          estSalesEur: Math.round(result[3].value * 0.89),
          status: result[4].value
        }

        self.markets.push(data)
        vm.clearInputs()
      })
    },

    editMarket (index) {
      this.button = 'edit market'
      this.form = this.markets[index]

      var inputs = document.getElementsByClassName('mdl-textfield--floating-label')
      console.log(inputs)
      var intputsArray = Array.from(inputs)
      intputsArray.forEach(function (item) {
        item.className += ' is-dirty'
      })

      this.markets.splice(index, 1, this.form)
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
      this.button = 'add market'
    },

    removeFloatingLabel () {
      var inputs = document.getElementById('form').getElementsByClassName('is-dirty')
      var intputsArray = Array.from(inputs)
      intputsArray.forEach(function (item) {
        item.classList.remove('is-dirty')
      })
    }
  }
})
