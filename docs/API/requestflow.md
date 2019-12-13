# Request Flow

For every action that handles user interaction with the app (e.g.: login, registration or ordering a product) the API works 
as a Proxy between the hubble PWA and the actual shopping backend. 

## Request Flow - Overview

<div class="table-wrap">

<table>
<thead>
<tr class="header">
<th>Realm</th>
<th>Request Method</th>
<th>Auth Required</th>
<th><p>Payment API</p>
<p>Route</p></th>
<th><p>Payment API</p>
<p>Response</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Customer Login</td>
<td>POST</td>
<td><img src="/assets/images/icons/emoticons/forbidden.svg" class="emoticon emoticon-minus" alt="(Minus)" /></td>
<td>/api/login</td>
<td><p><img src="/assets/images/icons/emoticons/information.svg" class="emoticon emoticon-information" alt="(Info)" /> create personal access token</p>
<ul>
<li>success (boolean)</li>
<li>auth (personal access token)</li>
<li>user (object)</li>
</ul>
<p>Example:<br />
<a href="API_Request_Response/CustomerLogin.html">Request / Response - Customer Login</a></p></td>
</tr>
<tr class="even">
<td>Customer Logout</td>
<td>POST</td>
<td><img src="/assets/images/icons/emoticons/check.svg" class="emoticon emoticon-tick" alt="(Haken)" /></td>
<td>/api/logout</td>
<td><p><img src="/assets/images/icons/emoticons/information.svg" class="emoticon emoticon-information" alt="(Info)" /> revoke personal access token</p>
<ul>
<li>success (boolean)</li>
<li>message</li>
<li>users (null)</li>
<li>token (null)</li>
</ul>
<p>Example:<br />
<a href="API_Request_Response/CustomerLogout.html">Request / Response - Customer Logout</a></p></td>
</tr>
<tr class="odd">
<td>Customer Registration</td>
<td>POST</td>
<td><img src="/assets/images/icons/emoticons/forbidden.svg" class="emoticon emoticon-minus" alt="(Minus)" /></td>
<td>/api/register</td>
<td><p><img src="/assets/images/icons/emoticons/information.svg" class="emoticon emoticon-information" alt="(Info)" /> create personal access token</p>
<ul>
<li>success (boolean)</li>
<li>auth (personal access token)</li>
<li>user (object)</li>
</ul>
<p>Example:<br />
<a href="API_Request_Response/CustomerRegister.html">Request / Response - Customer Register</a></p></td>
</tr>
<tr class="even">
<td>Add Customer Address</td>
<td>POST</td>
<td><img src="/assets/images/icons/emoticons/check.svg" class="emoticon emoticon-tick" alt="(Haken)" /></td>
<td><p>api/customer/{customer}/<br />
addresses</p></td>
<td><a href="API_Request_Response/CustomerAddressesPost.html">Request / Response - Customer Addresses POST</a></td>
</tr>
<tr class="odd">
<td>Get Customer Address</td>
<td>GET</td>
<td><img src="/assets/images/icons/emoticons/check.svg" class="emoticon emoticon-tick" alt="(Haken)" /></td>
<td>api/customer/{customer}/<br />
addresses</td>
<td><a href="API_Request_Response/CustomerAddressesGet.html">Request / Response - Customer Addresses GET</a></td>
</tr>
<tr class="even">
<td>Edit Customer Address</td>
<td>PUT | PATCH</td>
<td><img src="/assets/images/icons/emoticons/check.svg" class="emoticon emoticon-tick" alt="(Haken)" /></td>
<td><p>api/customer/{customer}/<br />
addresses/{address}</p></td>
<td><a href="API_Request_Response/CustomerAddressesPut.html">Request / Response - Customer Addresses PUT | PATCH</a></td>
</tr>
<tr class="odd">
<td>Delete Customer Address</td>
<td>DELETE</td>
<td><img src="/assets/images/icons/emoticons/check.svg" class="emoticon emoticon-tick" alt="(Haken)" /></td>
<td>api/customer/{customer}/<br />
addresses/{address}</td>
<td><a href="API_Request_Response/CustomerAddressesDelete.html">Request / Response - Customer Addresses DELETE</a></td>
</tr>
<tr class="even">
<td>Apply Coupon</td>
<td>POST</td>
<td><img src="/assets/images/icons/emoticons/forbidden.svg" class="emoticon emoticon-minus" alt="(Minus)" /></td>
<td><p>api/cart/apply_coupon</p></td>
<td><p><img src="/assets/images/icons/emoticons/information.svg" class="emoticon emoticon-information" alt="(Info)" /> Request contains stringified JSON</p>
<p><a href="API_Request_Response/ApplyCoupon.html">Request / Response - Apply Coupon</a></p></td>
</tr>
<tr class="odd">
<td>Recalculate Cart</td>
<td>POST</td>
<td><img src="/assets/images/icons/emoticons/forbidden.svg" class="emoticon emoticon-minus" alt="(Minus)" /></td>
<td><p>api/cart/recalculate</p></td>
<td><p><img src="/assets/images/icons/emoticons/information.svg" class="emoticon emoticon-information" alt="(Info)" /> Request and Response contains stringified JSON</p>
<p><a href="API_Request_Response/RecalculateCart.html">Request / Response - Recalculate Cart</a></p></td>
</tr>
<tr class="even">
<td>Post Form Recaptcha V3</td>
<td>POST</td>
<td><img src="/assets/images/icons/emoticons/forbidden.svg" class="emoticon emoticon-minus" alt="(Minus)" /></td>
<td>api/form_recaptcha</td>
<td><p><img src="/assets/images/icons/emoticons/information.svg" class="emoticon emoticon-information" alt="(Info)" /> Request Parameter contains stringified JSON</p>
<p><a href="API_Request_Response/PostFormRecaptcha.html">Request / Response - Post Form Recaptcha V3</a></p></td>
</tr>
<tr class="odd">
<td>Post Form</td>
<td>POST</td>
<td><img src="/assets/images/icons/emoticons/forbidden.svg" class="emoticon emoticon-minus" alt="(Minus)" /></td>
<td>api/form</td>
<td><p><img src="/assets/images/icons/emoticons/information.svg" class="emoticon emoticon-information" alt="(Info)" /> Request Parameter contains stringified JSON</p>
<p><a href="API_Request_Response/PostForm.html">Request / Response - Post Form</a></p></td>
</tr>
<tr class="even">
<td>Store Order</td>
<td>POST</td>
<td><img src="/assets/images/icons/emoticons/forbidden.svg" class="emoticon emoticon-minus" alt="(Minus)" /></td>
<td>api/order</td>
<td><p><img src="/assets/images/icons/emoticons/information.svg" class="emoticon emoticon-information" alt="(Info)" /> Request Parameter contains stringified JSON</p>
<p><a href="API_Request_Response/OrderStore.html">Request / Response - Store Order</a></p></td>
</tr>
<tr class="odd">
<td>Get All Orders</td>
<td>GET</td>
<td><img src="/assets/images/icons/emoticons/forbidden.svg" class="emoticon emoticon-minus" alt="(Minus)" /></td>
<td>api/order</td>
<td><p><img src="/assets/images/icons/emoticons/information.svg" class="emoticon emoticon-information" alt="(Info)" /> Response Parameter contains stringified JSON</p>
<p><a href="API_Request_Response/OrdersGet.html">Request / Response - Get Orders</a></p></td>
</tr>
<tr class="even">
<td>Get Payments</td>
<td>GET</td>
<td><img src="/assets/images/icons/emoticons/forbidden.svg" class="emoticon emoticon-minus" alt="(Minus)" /></td>
<td>api/payment</td>
<td><a href="API_Request_Response/PaymentMethodsGet.html">Request / Response - Get Payments</a></td>
</tr>
<tr class="odd">
<td>Get Shipping</td>
<td>GET</td>
<td><img src="/assets/images/icons/emoticons/forbidden.svg" class="emoticon emoticon-minus" alt="(Minus)" /></td>
<td>api/shipping</td>
<td><a href="API_Request_Response/ShippingMethodsGet.html">Request / Response - Get Shipping</a></td>
</tr>
</tbody>
</table>

</div>

