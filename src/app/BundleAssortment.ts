import ProductBundle, { Bundles } from './ProductBundle';
import { Age } from './Customer';
import { BankAccount, CreditCard } from './BankingProducts';


interface RestrictionAnswer {
    setRestrictionReason(message: string): void;
}

class BundleAssortmentRestrictions implements RestrictionAnswer {
    result: {
        isRestricted: boolean,
        message?: string
    } = { isRestricted: false };
    protected isCreditCardRestricted(productBundle: ProductBundle, appliedCreditCard: CreditCard) {
        if (productBundle.ageCategory === Age.junior)
            this.setRestrictionReason('Age is under 18');
        return this.result;
    }
    protected isBankAccountRestricted(productBundle: ProductBundle, appliedBankAccount: BankAccount) {
        if (productBundle.ageCategory > Age.junior && appliedBankAccount === BankAccount.juniorSaver)
            this.setRestrictionReason('Age is over 17, cannot apply for Junior Savings');
        else if (!productBundle.isStudent && appliedBankAccount === BankAccount.student)
            this.setRestrictionReason('Cannot assign student account to non-students');
        return this.result;
    }
    setRestrictionReason(message) {
        this.result.message = this.result.message ? this.result.message + ', ' + message : message;
        this.result.isRestricted = true;
    }
}

class BundleAssortment extends BundleAssortmentRestrictions {
    private appliedProd: {
        bankAccount?: BankAccount,
        creditCardCategory?: CreditCard,
        debitCardStatus?: boolean
    }={};
    constructor() {
        super();
    }
    applyForProduct(customer, appliedProduct) {
        let productBundle: ProductBundle = new ProductBundle(customer);
        if (appliedProduct.bankAccount)
            this.applyModificationForBankAccount(productBundle, appliedProduct.bankAccount);
        if (appliedProduct.creditCard)
            this.applyModificationForCreditCard(productBundle, appliedProduct.creditCard);
        return this.result;
    }
    private applyModificationForBankAccount(productBundle: ProductBundle, appliedModBankAccount: BankAccount) {
        this.setAppliedBankAccount(appliedModBankAccount);
        let isRestrictedResult = this.isBankAccountRestricted(productBundle, this.appliedProd.bankAccount);
        if (isRestrictedResult.isRestricted === false) {
            if (this.appliedProd.bankAccount > productBundle.bankAccount) {
                this.setRestrictionReason('U applied higher Bank account');
            }
        }
    }

    private applyModificationForCreditCard(productBundle: ProductBundle, appliedModCreditCard: CreditCard) {
        this.setAppliedCreditCard(appliedModCreditCard);
        let isRestrictedResult = this.isCreditCardRestricted(productBundle, this.appliedProd.creditCardCategory);
        if (isRestrictedResult.isRestricted === false) {
            if ( this.appliedProd.creditCardCategory > productBundle.creditCardCategory) {
                this.setRestrictionReason('U applied higher Credit Card');
            }
        }
    }

    private setAppliedCreditCard(appliedCreditCard) {
        switch (appliedCreditCard.toUpperCase()) {
            case 'CREDIT CARD':
                this.appliedProd.creditCardCategory = CreditCard.creditCard;
                break;
            case 'GOLD CREDIT CARD':
                this.appliedProd.creditCardCategory = CreditCard.goldCreditCard;
                break;
        }
    }
    private setAppliedBankAccount(appliedBankAccount) {
        switch (appliedBankAccount.toUpperCase()) {
            case 'JUNIOR SAVER':
                this.appliedProd.bankAccount = BankAccount.juniorSaver;
                break;
            case 'STUDENT':
                this.appliedProd.bankAccount = BankAccount.student;
                break;
            case 'CURRENT':
                this.appliedProd.bankAccount = BankAccount.current;
                break;
            case 'CURRENT PLUS':
                this.appliedProd.bankAccount = BankAccount.currentPlus;
                break;
        }
    }
}

export default BundleAssortment;