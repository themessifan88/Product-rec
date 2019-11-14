import ProductBundle from './ProductBundle';

describe('Product Bundle Tests: ', () => {
    describe('When customer is under 18',()=>{
        let pb: ProductBundle;

        it('should have bundle value 0, not student, income > 40000', () => {
            pb = new ProductBundle({ age: 17, student: 'no', income: 50000 });
            expect(pb.getBundleValue()).toBe(0);
        });
        it('should have bundle value 0, student, income > 40000', () => {
            pb = new ProductBundle({ age: 17, student: 'yes', income: 50000 });
            expect(pb.getBundleValue()).toBe(0);
        });
        it('should have bundle value 0, student, income < 40000', () => {
            pb = new ProductBundle({ age: 17, student: 'yes', income: 4000 });
            expect(pb.getBundleValue()).toBe(0);
        });
    });
    
    describe('When customer is over 18',()=>{
        let pb: ProductBundle;

        it('should have bundle value 0, student, income > 40000', () => {
            pb = new ProductBundle({ age: 23, student: 'yes', income: 50000 });
            expect(pb.getBundleValue()).toBe(0);
        });
        it('should have bundle value 0, student, income < 40000', () => {
            pb = new ProductBundle({ age: 17, student: 'yes', income: 5000 });
            expect(pb.getBundleValue()).toBe(0);
        });
        it('should have bundle value 0, not student, income < 40000', () => {
            pb = new ProductBundle({ age: 17, student: 'no', income: 4000 });
            expect(pb.getBundleValue()).toBe(0);
        });
        it('should have bundle value 0, not student, income > 40000', () => {
            pb = new ProductBundle({ age: 17, student: 'no', income: 54000 });
            expect(pb.getBundleValue()).toBe(0);
        });
    });

    describe('When customer is over 18, not student',()=>{
        let pb: ProductBundle;

        it('should have bundle value 0, income == 0', () => {
            pb = new ProductBundle({ age: 23, student: 'no', income: 0 });
            expect(pb.getBundleValue()).toBe(0);
        });
        it('should have bundle value 0, income < 12k', () => {
            pb = new ProductBundle({ age: 23, student: 'no', income: 11000 });
            expect(pb.getBundleValue()).toBe(1);
        });
        it('should have bundle value 0,  12k < income < 40k', () => {
            pb = new ProductBundle({ age: 23, student: 'no', income: 24000 });
            expect(pb.getBundleValue()).toBe(2);
        });
        it('should have bundle value 0, income > 40k', () => {
            pb = new ProductBundle({ age: 23, student: 'no', income: 54000 });
            expect(pb.getBundleValue()).toBe(3);
        });
    });
})