import BankingProducts, { BankAccount, CreditCard } from './BankingProducts';

export enum Bundles {
    juniorSaver = 0,
    student = 0,
    classic = 1,
    classicPlus = 2,
    gold = 3
}

class ProductBundle extends BankingProducts {
    bundleValue: number = 0;

    constructor(customer) {
        super(customer);
        this.setBundleValue();
    }
    getBundleValue() {
        return this.bundleValue;
    }

    private setBundleValue() {
        if (this.bankAccount === BankAccount.juniorSaver)
            this.bundleValue = Bundles.juniorSaver;
        else if (this.isStudent && this.bankAccount === BankAccount.student)
            this.bundleValue = Bundles.student;
        else if (!this.isStudent && this.bankAccount === BankAccount.current) {
            this.bundleValue = Bundles.classic;
            if (this.creditCardCategory == CreditCard.creditCard)
                this.bundleValue = Bundles.classicPlus;
        }
        else if (!this.isStudent
            && this.bankAccount === BankAccount.currentPlus
            && this.creditCardCategory === CreditCard.goldCreditCard)
            this.bundleValue = Bundles.gold;
    }
}





export default ProductBundle;