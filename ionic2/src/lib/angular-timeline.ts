import { Component } from '@angular/core';

@Component({
  selector: 'timeline',
  template: '<ul><ng-content></ng-content></ul>'
})
export class Timeline {
  constructor() {}
}

@Component({
  selector: 'timeline-event',
  template: '<li><ng-content></ng-content></li>'
})
export class TimelineEvent {
  constructor() {}
}

@Component({
  selector: 'timeline-badge',
  template: '<ng-content></ng-content>'
})
export class TimelineBadge {
  constructor() {}
}

@Component({
  selector: 'timeline-heading',
  template: '<ng-content></ng-content>'
})
export class TimelineHeading {
  constructor() {}
}

@Component({
  selector: 'timeline-panel',
  template: '<ng-content></ng-content>'
})
export class TimelinePanel {
  constructor() {}
}


