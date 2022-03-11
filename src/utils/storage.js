const localStorageHelper = {
  save: (name, value) => {
    localStorage.setItem(name, JSON.stringify(value))
  },
  remove(name) {
    localStorage.removeItem(name)
  },
  get(name) {
    let value = localStorage.getItem(name)
    if (value) {
      return value ? JSON.parse(value) : []
    }
  },
  clear() {
    localStorage.clear()
  }
}

export default localStorageHelper
