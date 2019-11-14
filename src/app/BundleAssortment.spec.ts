import BundleAssortment from './BundleAssortment';

fdescribe('Bundle Assortment Tests: ', () => {
    let ba: BundleAssortment;
    beforeEach(() => {
        ba = new BundleAssortment();
    });
    afterEach(() => {
        ba = null;
    });

    describe('When customer is under 18', () => {
        describe('When customer is a student', () => {
            let cus = { age: 17, student: 'yes', income: 0 };
            it('should restrict, student, income == 0, applying for current bank a/c', () => {
                let applicationResult = ba.applyForProduct(cus,
                    { bankAccount: 'current', creditCard: 'gold credit card' });
                expect(applicationResult.isRestricted).toBe(true);
            });
            it('should restrict, student, income > 13000, applying for current bank a/c', () => {
                cus.income = 13000;
                let applicationResult = ba.applyForProduct(cus,
                    { bankAccount: 'current' });
                expect(applicationResult.isRestricted).toBe(true);
            });
        });
        describe('When customer is not a student', () => {
            let cus = { age: 17, student: 'no', income: 0 };
            it('should restrict, student, income == 0, applying for junior saver bank a/c', () => {
                let applicationResult = ba.applyForProduct(cus,
                    { bankAccount: 'junior saver' });
                expect(applicationResult.isRestricted).toBe(false);
            });
            it('should restrict, student, income == 0, applying for current bank a/c', () => {
                let applicationResult = ba.applyForProduct(cus,
                    { bankAccount: 'current', creditCard: 'gold credit card' });
                expect(applicationResult.isRestricted).toBe(true);
            });
        });
    });

    describe('When customer is over 17', () => {
        describe('When customer is a student', () => {
            let cus = { age: 23, student: 'yes', income: 0 };
            it('should restrict, student, income == 0, applying for current bank a/c', () => {
                let applicationResult = ba.applyForProduct(cus,
                    { bankAccount: 'current', creditCard: 'gold credit card' });
                expect(applicationResult.isRestricted).toBe(true);
            });
            it('should restrict, student, income > 13000, applying for current bank a/c', () => {
                cus.income = 13000;
                let applicationResult = ba.applyForProduct(cus,
                    { bankAccount: 'current' });
                expect(applicationResult.isRestricted).toBe(true);
            });
        });

        describe('When customer is not a student', () => {
            let cus = { age: 23, student: 'no', income: 0 };
            it('should restrict, student, income == 0, applying for current bank a/c', () => {
                let applicationResult = ba.applyForProduct(cus,
                    { bankAccount: 'current', creditCard: 'gold credit card' });
                expect(applicationResult.isRestricted).toBe(true);
            });
            it('should restrict, student, income == 13000, applying for current bank a/c', () => {
                cus.income = 13000;
                let applicationResult = ba.applyForProduct(cus,
                    { bankAccount: 'current' });
                expect(applicationResult.isRestricted).toBe(false);
            });
            it('should restrict, student, income == 13000, applying for current bank a/c and gold credit card', () => {
                cus.income = 13000;
                let applicationResult = ba.applyForProduct(cus,
                    { bankAccount: 'current', creditCard: 'gold credit card' });
                expect(applicationResult.isRestricted).toBe(true);
            });
            it('should restrict, student, income == 43000, applying for currentPlus bank a/c and gold credit card', () => {
                cus.income = 43000;
                let applicationResult = ba.applyForProduct(cus,
                    { bankAccount: 'current Plus', creditCard: 'gold credit card' });
                expect(applicationResult.isRestricted).toBe(false);
            });
        });
    });
});