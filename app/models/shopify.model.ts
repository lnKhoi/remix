export type DiscountCode = {
    id: number;
    value_type: string;
    value: string;
    customer_selection: string;
    target_type: string;
    target_selection: string;
    allocation_method: string;
    allocation_limit: number | null;
    once_per_customer: boolean;
    usage_limit: number | null;
    starts_at: string;
    ends_at: string | null;
    created_at: string;
    updated_at: string;
    entitled_product_ids: number[];
    entitled_variant_ids: number[];
    entitled_collection_ids: number[];
    entitled_country_ids: number[];
    prerequisite_product_ids: number[];
    prerequisite_variant_ids: number[];
    prerequisite_collection_ids: number[];
    customer_segment_prerequisite_ids: number[];
    prerequisite_customer_ids: number[];
    prerequisite_subtotal_range: number | null;
    prerequisite_quantity_range: number | null;
    prerequisite_shipping_price_range: number | null;
    prerequisite_to_entitlement_quantity_ratio: {
        prerequisite_quantity: number | null;
        entitled_quantity: number | null;
    };
    prerequisite_to_entitlement_purchase: {
        prerequisite_amount: number | null;
    };
    title: string;
    admin_graphql_api_id: string;
}

export type Shopify = {
    brandId:string,
    id:string,
    platform:string,
    shopUrl:string,
    shopName:string
}