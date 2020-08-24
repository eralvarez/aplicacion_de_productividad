

function fixDecimal(numberToFix) {
    return (Math.round(numberToFix * 100) / 100) || 0;
}

module.exports = {
    fixDecimal,
};