function profileLoyaltyPoints(profile) {
	return Math.max(0, profile?.loyalty_points ?? 0);
}
/** Convert points to rupees (floored to ₹10 blocks). */
function rupeesFromPoints(points) {
	if (points < 100) return 0;
	return Math.floor(points / 100) * 10;
}
/** Max redeemable rupees given balance and remaining payable amount. */
function maxRedeemRupees(points, payable) {
	return Math.min(rupeesFromPoints(points), Math.max(0, Math.floor(payable / 10) * 10));
}
//#endregion
export { profileLoyaltyPoints as n, rupeesFromPoints as r, maxRedeemRupees as t };
