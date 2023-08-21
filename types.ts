import Stripe from 'stripe';


export interface UserDetails{
    id: string;
    fname:string;
    lname:string;
    fullname?:string;
    avatar?:string
    billingAddress?:Stripe.Address;
    payementMethod?:Stripe.PaymentMethod[Stripe.PaymentMethod.Type];
}

export interface Product{
    id: string;
    active?: boolean;
    name?: string;
    desc?: string;
    image?: string;
    metadata?: Stripe.Metadata;
}


export interface Price{
    id:string;
    product_id?:string;
    active?:boolean;
    desc?:string;
    unit_amount?:number;
    currency?:string;
    type?:Stripe.Price.Type;
    interval?:Stripe.Price.Recurring.Interval;
    interval_count?:number;
    trial_period_days?:number | null;
    metadata?: Stripe.Metadata;
    products?: Product;
}

export interface Subscription{
    id:string;
    user_id:string;
    status?:Stripe.Subscription.Status;
    metadata?:Stripe.Metadata;
    price?:string;
    qte?:number;
    cancel_at_period_end?:string;
    created_at:string;
    current_period_start:string;
    current_period_end:string;
    ended_at?:string;
    cancel_at?:string;
    canceled_at?:string;
    trial_start?:string;
    trial_end?:string;
    prices?:Price;
}


export interface Song{
    id: string;
    user_id: string;
    author: string;
    title: string;
    song_path: string;
    image_path: string;
}