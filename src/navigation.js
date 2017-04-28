class NavigationActions {
  setNavigator(navigator) {
    this.navigator = navigator;
  }

  push = params => this.navigator.push(params);
  pop = params => this.navigator.pop(params);
  popToRoot = params => this.navigator.popToRoot(params);
  resetTo = params => this.navigator.resetTo(params);
}


export default new NavigationActions();
