"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.informepAnimations = void 0;
var animations_1 = require("@angular/animations");
exports.informepAnimations = [
    animations_1.trigger('fabToggler', [
        animations_1.state('inactive', animations_1.style({
            transform: 'rotate(0deg)'
        })),
        animations_1.state('active', animations_1.style({
            transform: 'rotate(225deg)'
        })),
        animations_1.state('active2', animations_1.style({
            transform: 'rotate(360deg)'
        })),
        animations_1.transition('* <=> *', animations_1.animate('200ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
    animations_1.trigger('speedDialStagger', [
        animations_1.transition('* => *', [
            animations_1.query(':enter', animations_1.style({ opacity: 0 }), { optional: true }),
            animations_1.query(':enter', animations_1.stagger('40ms', [
                animations_1.animate('200ms cubic-bezier(0.4, 0.0, 0.2, 1)', animations_1.keyframes([
                    animations_1.style({ opacity: 0, transform: 'translateY(10px)' }),
                    animations_1.style({ opacity: 1, transform: 'translateY(0)' }),
                ]))
            ]), { optional: true }),
            animations_1.query(':leave', animations_1.animate('200ms cubic-bezier(0.4, 0.0, 0.2, 1)', animations_1.keyframes([
                animations_1.style({ opacity: 1 }),
                animations_1.style({ opacity: 0 }),
            ])), { optional: true })
        ])
    ]),
    animations_1.trigger('detailExpand', [
        animations_1.state('collapsed', animations_1.style({ height: '0px', minHeight: '0' })),
        animations_1.state('expanded', animations_1.style({ height: '*' })),
        animations_1.transition('expanded <=> collapsed', animations_1.animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
    animations_1.trigger('fabIcon', [
        animations_1.state('default', animations_1.style({ transform: 'rotate(0deg)' })),
        animations_1.state('rotated', animations_1.style({ transform: 'rotate(-360deg)' })),
        animations_1.transition('* <=> *', animations_1.animate('200ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
];
//# sourceMappingURL=fabtoggler.js.map