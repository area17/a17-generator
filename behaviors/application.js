import { manageBehaviors } from '@area17/a17-behaviors';
import * as Behaviors from './behaviors'; // Critical behaviors

window.A17 = window.A17 || {}; // currently namespaced name *is* important

document.addEventListener('DOMContentLoaded', () => {
    // expose manageBehaviors
    window.A17.behaviors = manageBehaviors;
    // init behaviors!
    window.A17.behaviors.init(Behaviors, {
      breakpoints: ['sm', 'md', 'lg', 'xl'] // tell this app what your breakpoint names are, in size order, manageBehaviors will read a CSS variable and compare for media scoped behaviors, default is ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']
    });
});
