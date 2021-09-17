// Handle a top-level error while rendering React app
// Can't use React components

const reactErrorModal = (error, info) => {
  const $ = window.jQuery;
  const title = "Rendering error";
  const subtitle = "Sorry, the webpage encountered a rendering error!";

  const alert = $(`
      <div class="modal" id="error-modal">
        <div class="modal-content">
          <div class="modal-title">
            React error
          </div>

          <div class="modal-body">
            <p> React app encountered an error while rendering: </p>
            <p> Error: ${error} </p>
            <pre>Stack trace:</pre>
            <pre style="text-align: left; font-size: 0.6rem;">
              ${info.componentStack}\n\n
            </pre>
          </div>

          <div class="modal-footer">
            <button class="button" data-dismiss="modal"> Close </button>
          </div>
        </div>
      </div>
    `);
  $('#root').append(alert)
  $('#error-modal').modal()
}

export default reactErrorModal;
