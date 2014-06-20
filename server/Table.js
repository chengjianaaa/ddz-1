/**
 * Created by a2014 on 14-6-20.
 */

var Poker = require('./Poker');

function Table(o) {
    this.poker = [];
    this.player = o.player || [];

    this.init();

}

Table.prototype = {

    deal: function () {
        var index = Math.ceil(Math.random() * 1000) % this.poker.length;
        if (this.poker.length > 3) {
            this.player[this.poker.length % 3].addPoker(this.poker[index]);
            this.poker.splice(index, 1);
            this.deal();
        } else {
            this.render();
        }
    },
    init: function () {
        var div = document.createElement('div');
        div.className = 'table';

        this.el = div;
        document.querySelector('body').appendChild(this.el);
        this.generatePoker();
        this.deal();
    },

    render: function () {
        var me = this;
        this.player.forEach(function (player) {
            var div = document.createElement('div');
            div.className = 'player-poker';
            me.el.appendChild(div);
            player.poker.forEach(function (item, index) {
                item.el.style.left = index * 40 + 'px';
                item.render(div);
            })

        })
        this.addEvent();


    },
    isOut: function (el) {
        var is = false;
        var dis = parseInt(el.style.webkitTransform.split(',')[1]);
        if (dis < 0) {
            is = true;
        }
        return is;
    },
    addEvent: function () {
        var me = this;
        this.el.onclick = function (e) {
            var dom = e.target.offsetParent;
            if (dom.className == 'poker') {
                if (me.isOut(dom)) {
                    me.animate(dom, 0);
                } else {
                    me.animate(dom, -10);
                }
            }
        }

    }
}


exports.Table = Table;
exports.generatePoker = generatePoker;
