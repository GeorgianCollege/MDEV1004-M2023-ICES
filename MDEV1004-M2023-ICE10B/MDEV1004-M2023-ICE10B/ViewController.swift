import UIKit
import StripePaymentSheet

class ViewController: UIViewController {
  @IBOutlet weak var checkoutButton: UIButton!
  var paymentSheet: PaymentSheet?
  let backendCheckoutUrl = URL(string: "http://localhost:3000/api/payment")!

  override func viewDidLoad() {
    super.viewDidLoad()

    checkoutButton.addTarget(self, action: #selector(didTapCheckoutButton), for: .touchUpInside)
    checkoutButton.isEnabled = false

    fetchPaymentIntent()
  }
    
    func fetchPaymentIntent()
    {
        // Fetch the PaymentIntent client secret and publishable key
        var request = URLRequest(url: backendCheckoutUrl)
        request.httpMethod = "POST"
        let task = URLSession.shared.dataTask(with: request, completionHandler: { [weak self] (data, response, error) in
            guard let data = data,
            let json = try? JSONSerialization.jsonObject(with: data, options: []) as? [String : Any],
            let clientSecret = json["clientSecret"] as? String,
            let publishableKey = json["publishableKey"] as? String,
            let self = self else
            {
                // Handle errors here
                return
            }
            
            STPAPIClient.shared.publishableKey = publishableKey
            // Create and configure a PaymentSheet instance
            var configuration = PaymentSheet.Configuration()
            configuration.merchantDisplayName = "Akrotech"
            configuration.defaultBillingDetails.address.country = "CA"
            configuration.allowsDelayedPaymentMethods = true
            self.paymentSheet = PaymentSheet(paymentIntentClientSecret: clientSecret, configuration: configuration)
            
            DispatchQueue.main.async
            {
                self.checkoutButton.isEnabled = true
            }
        })
        task.resume()
    }
    
    
    @objc
    func didTapCheckoutButton() {
      // MARK: Start the checkout process
      paymentSheet?.present(from: self) { paymentResult in
        // MARK: Handle the payment result
        switch paymentResult {
        case .completed:
          print("Your order is confirmed")
        case .canceled:
          print("Canceled!")
        case .failed(let error):
          print("Payment failed: \(error)")
        }
      }
    }

}
