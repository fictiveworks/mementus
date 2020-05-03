class IntegerId {
  constructor(startValue=1) {
    this.currentValue = startValue;
  }

  nextId() {
    const allocatedValue = this.currentValue;
    this.currentValue++;
    return allocatedValue;
  }
}

export default IntegerId;
