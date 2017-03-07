
export default function sendTransaction(order) {  
  return new Promise((resolve) => {

    // create a timeout to always resolve. this is in case there is a problem
    // sending the items/transaction
    let timeout = setTimeout(() => {
      console.log('Google analytics transaction timed out');
      resolve();
    }, 3000);

    // this will be called after the transaction and all
    // items are sent to the server.  once all elements have been
    // sent, it will resolve the promise.
    let hits = 1;  // items + transaction
    let hitCallback = function() {
      hits -= 1;
      if(hits === 0) {
        clearTimeout(timeout); // clear the timeout so promise doesn't resolve twice
        console.log('Google analytics transaction sent');
        resolve();
      }
    };

    // process the transaction and all items
    ga('require', 'ecommerce');
    ga('ecommerce:addTransaction', {
      id: order.id,
      revenue: order.amount,
			currency: 'USD',
      hitCallback,  // fires when tx send is done
    });

    ga('ecommerce:send');

  })
  // handle a hard failure conditions gracefully (ie: ga didn't load)
  .catch((ex) => {
    console.log('Error sending Google analytics transaction');
    console.log(ex);
  });
}