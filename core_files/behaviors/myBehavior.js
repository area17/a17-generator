import { createBehavior } from '@area17/a17-behaviors';

const myBehavior = createBehavior(
  'myBehavior',
  {
    alert(val) {
      window.alert('Hello world!');
    }
  },
  {
    init() {
      this.$node.addEventListener('click', this.alert);
    },
    destroy() {
      this.$node.removeEventListener('click', this.alert);
    }
  }
);

export default myBehavior;
