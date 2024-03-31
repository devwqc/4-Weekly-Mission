function hasInitialInputType(hasVisibleToggler = false, isVisible = true) {
  if (!hasVisibleToggler) return true;
  return isVisible;
}

export default hasInitialInputType;
