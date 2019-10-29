let _isDrawerOpen = false;
let _drawerRef = null;
let _modalRef = null;
let _appLoader = null;


class AppMem {

  static get drawerRef() {
    return _drawerRef
  }

  static set drawerRef(value) {
    _drawerRef = value
  }

  static get isDrawerOpen() {
    return _isDrawerOpen
  }

  static set isDrawerOpen(value) {
    _isDrawerOpen = value
  }

  static openDrawer() {
    _drawerRef.open()
  }

  static closeDrawer() {
    _drawerRef.close()
  }

  static get modalRef() {
    return _modalRef
  }

  static set modalRef(value) {
    _modalRef = value
  }

  static get isModalOpen() {
    return _isModalOpen
  }

  static set isModalOpen(value) {
    _isModalOpen = value
  }

  static openModal(children, props) {
    _modalRef.open(children, props)
  }

  static closeModal() {
    _modalRef.close()
  }

  static get appLoader() {
    return _appLoader;
  }

  static set appLoader(value) {
    _appLoader = value;
  }

  static openAppLoader(type, props) {
    _appLoader.open(type, props);
  }
  
  static closeAppLoader() {
    _appLoader.close();
  }

}

module.exports = AppMem
