document
  .getElementById("pincode-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form from submitting the traditional way

    const pincode = document.getElementById("pincode").value;
    const resultDiv = document.getElementById("result");

    // Validate pincode length
    if (pincode.length !== 6 || isNaN(pincode)) {
      resultDiv.innerHTML =
        '<p style="color: red;">Please enter a valid 6-digit pincode.</p>';
      return;
    }

    try {
      const response = await fetch(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      const data = await response.json();

      if (data[0].Status === "Success") {
        const details = data[0].PostOffice[0];
        resultDiv.innerHTML = `
              <h2>Pincode Details</h2>
              <p><strong>Post Office Name:</strong> ${details.Name}</p>
              <p><strong>Pincode:</strong> ${details.Pincode}</p>
              <p><strong>District:</strong> ${details.District}</p>
              <p><strong>State:</strong> ${details.State}</p>
          `;
      } else {
        resultDiv.innerHTML =
          '<p style="color: red;">Invalid pincode. Please try again.</p>';
      }
    } catch (error) {
      resultDiv.innerHTML =
        '<p style="color: red;">An error occurred. Please try again later.</p>';
    }
  });
