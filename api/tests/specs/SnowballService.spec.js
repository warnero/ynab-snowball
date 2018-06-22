let
    chai = require('chai'),
    should = chai.should(),
    expect = chai.expect,
    util = require("util"),
    async = require("async"),
    faker = require('faker'),
    moment = require('moment'),
    Snowball = require('../../services/Snowball');

describe('Snowball Service', function (){
    // before(function(done) {
    //     done();
    // });

    describe('Payoff Function', function() {
        it('should calculate payoff when payment amount is greater than balance', function (done) {
            let
                monthlyInterestRate = 5.99/12,
                balance = 25,
                paymentAmt = 50,
                months = [];

            Snowball.calculatePayoff(monthlyInterestRate, balance, paymentAmt, months);
            should.equal(24.88, months[0].snowballAmt);
            should.equal(.12, months[0].interestPaid);
            done();
        });

        it('should calculate payoff when payment amount is equal to balance', function (done) {
            let
                monthlyInterestRate = 5.99/12,
                balance = 25,
                paymentAmt = 25.12,
                months = [];

            Snowball.calculatePayoff(monthlyInterestRate, balance, paymentAmt, months);
            console.log('months ', months);
            should.equal(0, months[0].snowballAmt);
            should.equal(.12, months[0].interestPaid);
            done();
        });

        it('should calculate payoff when payment amount is less than balance', function (done) {
            let
                monthlyInterestRate = 5.99/12,
                balance = 100,
                paymentAmt = 50,
                months = [];

            Snowball.calculatePayoff(monthlyInterestRate, balance, paymentAmt, months);
            console.log('months ', months);
            //[ { interestPaid: 0.5, balanceCarryover: 50.5, snowballAmt: 0 },
            //   { interestPaid: 0.25, balanceCarryover: 0.75, snowballAmt: 0 },
            //   { interestPaid: 0, balanceCarryover: -49.25, snowballAmt: 49.25 } ]
            should.equal(0, months[0].snowballAmt);
            should.equal(.5, months[0].interestPaid);
            should.equal(.25, months[1].interestPaid);
            should.equal(49.25, months[2].snowballAmt);
            done();
        });
    });

    // after(function(done) {
    //     done();
    // });
});