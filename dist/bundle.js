(function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var shake = createCommonjsModule(function (module) {
	/*
	 * Author: Alex Gibson
	 * https://github.com/alexgibson/shake.js
	 * License: MIT license
	 */

	(function(global, factory) {
	    if ( module.exports) {
	        module.exports = factory(global, global.document);
	    } else {
	        global.Shake = factory(global, global.document);
	    }
	} (typeof window !== 'undefined' ? window : commonjsGlobal, function (window, document) {

	    function Shake(options) {
	        //feature detect
	        this.hasDeviceMotion = 'ondevicemotion' in window;

	        this.options = {
	            threshold: 15, //default velocity threshold for shake to register
	            timeout: 1000 //default interval between events
	        };

	        if (typeof options === 'object') {
	            for (var i in options) {
	                if (options.hasOwnProperty(i)) {
	                    this.options[i] = options[i];
	                }
	            }
	        }

	        //use date to prevent multiple shakes firing
	        this.lastTime = new Date();

	        //accelerometer values
	        this.lastX = null;
	        this.lastY = null;
	        this.lastZ = null;

	        //create custom event
	        if (typeof document.CustomEvent === 'function') {
	            this.event = new document.CustomEvent('shake', {
	                bubbles: true,
	                cancelable: true
	            });
	        } else if (typeof document.createEvent === 'function') {
	            this.event = document.createEvent('Event');
	            this.event.initEvent('shake', true, true);
	        } else {
	            return false;
	        }
	    }

	    //reset timer values
	    Shake.prototype.reset = function () {
	        this.lastTime = new Date();
	        this.lastX = null;
	        this.lastY = null;
	        this.lastZ = null;
	    };

	    //start listening for devicemotion
	    Shake.prototype.start = function () {
	        this.reset();
	        if (this.hasDeviceMotion) {
	            window.addEventListener('devicemotion', this, false);
	        }
	    };

	    //stop listening for devicemotion
	    Shake.prototype.stop = function () {
	        if (this.hasDeviceMotion) {
	            window.removeEventListener('devicemotion', this, false);
	        }
	        this.reset();
	    };

	    //calculates if shake did occur
	    Shake.prototype.devicemotion = function (e) {
	        var current = e.accelerationIncludingGravity;
	        var currentTime;
	        var timeDifference;
	        var deltaX = 0;
	        var deltaY = 0;
	        var deltaZ = 0;

	        if ((this.lastX === null) && (this.lastY === null) && (this.lastZ === null)) {
	            this.lastX = current.x;
	            this.lastY = current.y;
	            this.lastZ = current.z;
	            return;
	        }

	        deltaX = Math.abs(this.lastX - current.x);
	        deltaY = Math.abs(this.lastY - current.y);
	        deltaZ = Math.abs(this.lastZ - current.z);

	        if (((deltaX > this.options.threshold) && (deltaY > this.options.threshold)) || ((deltaX > this.options.threshold) && (deltaZ > this.options.threshold)) || ((deltaY > this.options.threshold) && (deltaZ > this.options.threshold))) {
	            //calculate time in milliseconds since last shake registered
	            currentTime = new Date();
	            timeDifference = currentTime.getTime() - this.lastTime.getTime();

	            if (timeDifference > this.options.timeout) {
	                window.dispatchEvent(this.event);
	                this.lastTime = new Date();
	            }
	        }

	        this.lastX = current.x;
	        this.lastY = current.y;
	        this.lastZ = current.z;

	    };

	    //event handler
	    Shake.prototype.handleEvent = function (e) {
	        if (typeof (this[e.type]) === 'function') {
	            return this[e.type](e);
	        }
	    };

	    return Shake;
	}));
	});

	const pupils = [{
	  name: 'Adam',
	  socialCompetence: 1,
	  math: 1,
	  sport: 2
	}, {
	  name: 'Berta',
	  socialCompetence: 2,
	  math: 2
	}, {
	  name: 'Celine',
	  socialCompetence: 1,
	  math: 3,
	  sport: 1
	}, {
	  name: 'Doreen',
	  socialCompetence: 2,
	  math: 3,
	  sport: 1
	}, {
	  name: 'Emil',
	  socialCompetence: 4,
	  math: 1,
	  sport: 2
	}, {
	  name: 'Felix'
	}, {
	  name: 'Gustav'
	}, {
	  name: 'Hans'
	}, {
	  name: 'Inge'
	}, {
	  name: 'Jörg',
	  socialCompetence: 2,
	  math: 2
	}, {
	  name: 'Karla'
	}, {
	  name: 'Line',
	  socialCompetence: 4,
	  math: 1,
	  sport: 2
	}, {
	  name: 'Max'
	}, {
	  name: 'Nadine',
	  socialCompetence: 4,
	  math: 1,
	  sport: 2
	}, {
	  name: 'Olaf'
	}, {
	  name: 'Petra'
	}, {
	  name: 'Stefanie'
	}, {
	  name: 'Tom'
	}, {
	  name: 'Uli',
	  socialCompetence: 2,
	  math: 2
	}, {
	  name: 'Veronica'
	}, {
	  name: 'Xavier',
	  socialCompetence: 2,
	  math: 2
	}, {
	  name: 'Zora'
	}];

	class TeamShaker {
	  static get teams() {
	    return +document.getElementById('numberOfTeams').value;
	  }

	  static get teamSize() {
	    return Math.ceil(pupils.length / this.teams);
	  }

	  static get skill() {
	    return document.getElementById('skill').value;
	  }

	  static shake() {
	    const teamsElement = document.getElementById('teams');
	    const teams = [];

	    for (let i = 0; i < TeamShaker.teams; i++) {
	      teams[i] = [];
	    } // partition


	    pupils.sort((a, b) => {
	      if (TeamShaker.skill) {
	        const skillScore = (b[TeamShaker.skill] ?? 0) - (a[TeamShaker.skill] ?? 0);

	        if (skillScore !== 0) {
	          return skillScore;
	        }
	      }

	      const socialScore = (b.socialCompetence ?? 0) - (a.socialCompetence ?? 0);

	      if (socialScore !== 0) {
	        return socialScore;
	      }

	      return Math.random() - Math.random();
	    });

	    for (let i = 0; i < pupils.length; i++) {
	      teams.sort((a, b) => {
	        const lVal = a.length - b.length;

	        if (lVal !== 0) {
	          return lVal;
	        }

	        const aScore = a.map(p => (TeamShaker.skill ? p[TeamShaker.skill] : p.socialCompetence) ?? 0).reduce((x, y) => x + y, 0);
	        const bScore = b.map(p => (TeamShaker.skill ? p[TeamShaker.skill] : p.socialCompetence) ?? 0).reduce((x, y) => x + y, 0);
	        const sVal = aScore - bScore;

	        if (sVal !== 0) {
	          return sVal;
	        }

	        return Math.random() - Math.random();
	      });
	      teams[0].push(pupils[i]);
	    }

	    teamsElement.innerHTML = '';
	    teams.forEach((t, i) => {
	      teamsElement.innerHTML += `
            <div class="col-6 col-lg-3 mb-3">
                <h5>Team ${i + 1}
                <small class="card-text text-muted">Score ${t.map(p => (TeamShaker.skill ? p[TeamShaker.skill] : p.socialCompetence) ?? 0).reduce((a, c) => a + c)}</small>
                </h5>
                ${t.map(p => `${p.name} (${(TeamShaker.skill ? p[TeamShaker.skill] : p.socialCompetence) ?? 0})`).join('<br>')}
            </div>
            `;
	    });
	    console.log(teams);
	  }

	}

	document.getElementById('shake').onclick = () => {
	  TeamShaker.shake();
	};

}());
