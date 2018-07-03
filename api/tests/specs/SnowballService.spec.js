const
    chai = require('chai'),
    should = chai.should(),
    expect = chai.expect,
    util = require("util"),
    async = require("async"),
    faker = require('faker'),
    moment = require('moment'),
    Snowball = require('../../services/Snowball'),
    accounts = require('../fixtures/accounts.data');

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
                paymentDate = moment().year(2018).month(0),
                months = [];

            let snowballHistory = [
                {
                    snowballPayment : {
                        yearMonth: paymentDate.format('YYYY-MM'),
                        paymentOrRollover: 0.00,
                        initialSnowball: 0.00,
                        currentSnowball: 0.00
                    }
                }
            ];
            Snowball.calculatePayoff(monthlyInterestRate, balance, paymentAmt, months, paymentDate, snowballHistory);
            should.equal(snowballHistory[snowballHistory.length - 2].snowballPayment.paymentOrRollover, 24.88);
            should.equal(snowballHistory[snowballHistory.length - 1].snowballPayment.currentSnowball, 50.00);
            should.equal(months[0].interestPaid, .12);
            done();
        });

        it('should calculate payoff when payment amount is greater than balance with snowball', function (done) {
            let
                monthlyInterestRate = 5.99/12,
                balance = 25,
                paymentAmt = 50,
                paymentDate = moment().year(2018).month(0),
                months = [];

            let snowballHistory = [
                {
                    snowballPayment : {
                        yearMonth: paymentDate.format('YYYY-MM'),
                        paymentOrRollover: 0.00,
                        initialSnowball: 15,
                        currentSnowball: 15
                    }
                }
            ];

            Snowball.calculatePayoff(monthlyInterestRate, balance, paymentAmt, months, paymentDate, snowballHistory);
            should.equal(snowballHistory[snowballHistory.length - 2].snowballPayment.paymentOrRollover, 24.88);
            should.equal(snowballHistory[snowballHistory.length - 1].snowballPayment.currentSnowball, 65.00);
            should.equal(months[0].interestPaid, .12);
            done();
        });

        it('should calculate payoff when payment amount is equal to balance plus interest due', function (done) {
            let
                monthlyInterestRate = 5.99/12,
                balance = 25,
                paymentAmt = 25.12,
                paymentDate = moment().year(2018).month(0),
                months = [];

            let snowballHistory = [
                {
                    snowballPayment : {
                        yearMonth: paymentDate.format('YYYY-MM'),
                        paymentOrRollover: 0.00,
                        initialSnowball: 0.00,
                        currentSnowball: 0.00
                    }
                }
            ];
            Snowball.calculatePayoff(monthlyInterestRate, balance, paymentAmt, months, paymentDate, snowballHistory);
            should.equal(snowballHistory[snowballHistory.length - 2].snowballPayment.paymentOrRollover, 0);
            should.equal(snowballHistory[snowballHistory.length - 1].snowballPayment.currentSnowball, 25.12);
            should.equal(months[0].interestPaid, .12);
            done();
        });

        it('should calculate payoff when payment amount is less than balance', function (done) {
            let
                monthlyInterestRate = 5.99/12,
                balance = 100,
                paymentAmt = 50,
                paymentDate = moment().year(2018).month(0),
                months = [];
            let snowballHistory = [
                {
                    snowballPayment : {
                        yearMonth: paymentDate.format('YYYY-MM'),
                        paymentOrRollover: 0.00,
                        initialSnowball: 0.00,
                        currentSnowball: 0.00
                    }
                }
            ];

            Snowball.calculatePayoff(monthlyInterestRate, balance, paymentAmt, months, paymentDate, snowballHistory);
            should.equal(snowballHistory[snowballHistory.length - 3].snowballPayment.paymentOrRollover, 0);
            should.equal(months[0].interestPaid, .5);
            should.equal(months[1].interestPaid, .25);
            should.equal(snowballHistory[snowballHistory.length - 2].snowballPayment.paymentOrRollover, 49.25);
            should.equal(snowballHistory[snowballHistory.length - 1].snowballPayment.currentSnowball, 50.00);
            should.equal(months[0].yearMonth, '2018-01');
            should.equal(months[2].yearMonth, '2018-03');
            done();
        });
    });

    describe('Snowball Function', function() {
        it('should calculate snowball for two accounts and give back two arrays', function (done) {
            let
                testAccounts = [accounts[0], accounts[1]];
            let snowball = Snowball.createSnowball(testAccounts, 0.00);

            should.equal(snowball[0].account.months[snowball[0].account.months.length - 1].yearMonth, '2039-07');
            should.equal(snowball[0].account.currentSnowball, 30);
            should.equal(snowball[1].account.currentSnowball, 80);
            done();
        });

        it('should calculate snowball with a starting amount for two accounts and give back two arrays', function (done) {
            let
                testAccounts = [accounts[0], accounts[1]];
            let snowball = Snowball.createSnowball(testAccounts, 25.00);

            should.equal(snowball[0].account.months[snowball[0].account.months.length - 1].yearMonth, '2025-02');
            should.equal(snowball[0].account.currentSnowball, 55);
            should.equal(snowball[1].account.currentSnowball, 105);
            done();
        });
    });

    // after(function(done) {
    //     done();
    // });
});