var BlockShow = function (node) {
    var self = this;
    self.node = node;
    self.sub = document.querySelector('.substrate-main');
    var data = self.node.getAttribute('data-component');
    self.popup = document.querySelector('[data-popup="'+ data +'"]');

    self.show = function () {

        self.node.onclick = function () {
            self.subShow();
            self.popupShow();
        };

        self.sub.onclick = function () {
            self.subHide();
            self.popupHide();
        };

        Array.prototype.forEach.call( document.querySelectorAll('[data-close="popup"]'), function (el) {
            el.onclick = function () {
                self.subHide();
                self.popupHide();
            }
        });
    };

    self.subShow = function () {
        self.sub.style.display = "block";
        setTimeout(function () {
            self.sub.classList.add('substrate-main_active');
        },100);
    };

    self.popupShow = function () {
        self.popup.style.display = "block";
        setTimeout(function () {
            self.popup.style.opacity = "1";
        },100);
    };

    self.subHide = function () {
        self.sub.classList.remove('substrate-main_active');
        setTimeout(function () {
            self.sub.style.display = "none";
        },300);
    };

    self.popupHide = function () {
        var popup = document.querySelectorAll('[data-popup]');
        Array.prototype.forEach.call(popup, function (el) {
            el.style.opacity = "0";
            setTimeout(function () {
                el.style.display = "none";
            },300);
        });

    };
};

var TabFilter =function (node) {
    var self = this;
    self.node = node;

    self.but = self.node.querySelectorAll('[data-tab="button-filter"]');
    self.butTitle = self.node.querySelectorAll('[data-tab="button-title"]');
    self.butImg = self.node.querySelectorAll('[data-tab="button-img"]');
    self.goods = self.node.querySelectorAll('[data-tab="filter-goods"]');

    self.init = function () {
        self.binding();
    };

    self.binding = function () {
        Object.keys(self.but).forEach(function (t) {
            self.but[t].butTitle = self.butTitle[t];
            self.but[t].butImg = self.butImg[t];
            self.but[t].goods = self.goods[t];

            self.but[t].onclick = function () {
                document.querySelector('.filter-mob-button_active').classList.remove('filter-mob-button_active');
                document.querySelector('.filter-mob__box_active').classList.remove('filter-mob__box_active');
                self.but[t].classList.add('filter-mob-button_active');
                self.but[t].goods.classList.add('filter-mob__box_active');
            };
        })
    };
};

var PullMenu = function (node) {
    var self = this;
    self.node = node;
    self.btnOpen = document.querySelector('[data-menu="open"]');
    self.btnClose = self.node.querySelector('[data-menu="close"]');
    self.sub = self.node.querySelector('[data-menu="substrate"]');
    self.menu = self.node.querySelector('[data-menu="menu"]');

    self.init = function () {
        self.visibilityMenu();
        self.closeMenu();
        self.sub.onclick = self.closeMenu;
        self.btnClose.onclick = self.closeMenu;
    };

    self.menuMovingLeft = function () {
        self.menu.classList.add('pull-out-menu__hold_active');
    };

    self.menuMovingRight = function () {
        self.menu.classList.remove('pull-out-menu__hold_active');
    };

    self.visibilityMenu = function () {
        self.btnOpen.onclick = function () {
            self.bodyHidden();
            self.node.style.display = "block";
            setTimeout(function () {
                self.sub.classList.add('pull-out-menu__substrate_active');
                self.btnClose.classList.add('pull-out-menu__close_active');
                self.menuMovingLeft();
            },100);
        };
    };

    self.bodyHidden = function () {
        document.body.style.overflow = 'hidden';
    };

    self.bodyVisib = function () {
        document.body.style.overflow = '';
    };

    self.closeMenu = function () {
        self.bodyVisib();
        self.menuMovingRight();
        self.sub.classList.remove('pull-out-menu__substrate_active');
        self.btnClose.classList.remove('pull-out-menu__close_active');
        setTimeout(function () {
            self.node.style.display = "none";
        },600);
    };
};

var OpenBlock = function (node) {
    var self = this;
    self.node = node;
    self.btnOpen = self.node.querySelector('[data-block="open"]');
    self.text = self.node.querySelector('[data-block="btn-text"]');
    self.box = self.node.querySelector('[data-block="box"]');
    self.sub = self.node.querySelector('[data-block="substrate"]');
    self.boxChildren = self.box.children;
    self.height = 0;

    self.init = function () {
        self.btnOpen.onclick = function () {
            self.toggle();
        };
        self.heightBlock();
    };

    self.heightBlock = function () {
        Array.prototype.forEach.call(self.boxChildren, function (el) {
            self.height += el.offsetHeight;
        });
    };

    self.openBlock = function () {
        self.box.style.transition = (self.height * 0.3)  + 'ms';
        self.box.style.height = self.height - 50 + 'px';
        self.box.setAttribute('data-open','true');
        self.sub.style.display = "none";
    };

    self.closeBlock = function () {
        self.box.style.height = "";
        self.box.setAttribute('data-open','false');
        self.sub.style.display = "";
    };

    self.ChangeText = function () {
        self.text.innerHTML = "Свернуть"
    };

    self.ChangeTextDefault = function () {
        self.text.innerHTML = "Показать полностью"
    };

    self.toggle = function () {
        var dataOpen = self.box.getAttribute('data-open');
        console.log(dataOpen);
        if (dataOpen != 'true') {
            self.openBlock();
            self.ChangeText();
        } else {
            self.closeBlock();
            self.ChangeTextDefault();
        }
    };

};

var DropdownMenu = function (node) {
    var self = this;
    self.node = node;
    self.link = self.node.querySelector('[data-dropdown="toggle"]');
    self.box = self.node.querySelector('[data-dropdown="box"]');

    self.init = function () {
        $(self.link).click(function () {
            if ($(this).is('.btn-dropdown-menu_active')) {
                $(this).removeClass('btn-dropdown-menu_active');
            } else {
                $(this).addClass('btn-dropdown-menu_active');
            }

            $(this).parent('li').siblings('li').find('.btn-dropdown-menu').removeClass('btn-dropdown-menu_active').siblings('ul').slideUp(200);
            $(self.box).slideToggle(200);
        })
    };
};



document.addEventListener('DOMContentLoaded', function () {

    var component = document.querySelectorAll('[data-component]');

    Array.prototype.forEach.call(component, function (el) {
        el = new BlockShow(el);
        el.show();
    });

    var componentFilter = new TabFilter(
        document.querySelector('[data-tab="filter"]')
    );
    componentFilter.init();

    var menuMob = new PullMenu(
        document.querySelector('[data-menu="container"]')
    );
    menuMob.init();

    var openBlock = document.querySelectorAll('[data-block="container"]');

    Array.prototype.forEach.call(openBlock, function (el) {
        el = new OpenBlock(el);
        el.init();
    });

    var dropdownMenu = document.querySelectorAll('[data-dropdown="container"]');

    Array.prototype.forEach.call(dropdownMenu, function (el) {
        el = new DropdownMenu(el);
        el.init();
    });




    var actionSwiperDisk = new Swiper('[data-action="disk"] #action-swiper-disk', {
        spaceBetween: 6,
        slidesPerView: 'auto',
        pagination: {
            el: '[data-action="disk"] .action-swiper__pagination',
            clickable: true
        }
    });

    var actionSwiperTire = new Swiper('[data-action="tire"] #action-swiper-disk', {
        spaceBetween: 6,
        slidesPerView: 'auto',
        pagination: {
            el: '[data-action="tire"] .action-swiper__pagination',
            clickable: true
        }
    });


});