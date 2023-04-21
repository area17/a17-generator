import { manageBehaviors } from '@area17/a17-behaviors';
import * as Behaviors from './behaviors'; // Critical behaviors

window.A17 = window.A17 || {}; // currently namespaced name *is* important

// process.env.STRUCTURE

document.addEventListener('DOMContentLoaded', () => {
    // expose manageBehaviors
    window.A17.behaviors = manageBehaviors;
    // init behaviors!
    window.A17.behaviors.init(Behaviors, {
      breakpoints: process.env.BREAKPOINTS
    });
});
