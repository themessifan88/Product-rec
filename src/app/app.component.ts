import { Component, OnInit } from '@angular/core';
import BundleAssortment from './BundleAssortment';
import ProductBundle from './ProductBundle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'product-rec';
  bundleValue: number;
  applicationResult: {
    isRestricted: boolean,
    message?: string
  };
  applied;
  customer;
  ngOnInit() {
    let pb = new ProductBundle({ age: 23, student: 'no', income: 314000 });
    this.bundleValue = pb.getBundleValue();
    console.log(pb.getBundleValue());

    let ba = new BundleAssortment();
    this.applied = { bankAccount: 'current', creditCard: 'gold credit card' };
    this.customer = { age: 23, student: 'yes', income: 0 };

    this.applicationResult = ba.applyForProduct(this.customer,this.applied);
  }
}
