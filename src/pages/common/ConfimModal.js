
export function ConfirmModal({onConfirm, children, showModal, toggleModal}){

  return (
    <>

      {/* Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              {/* Modal Header */}
              <div className="modal-header">
                <h5 className="modal-title">Add New Workout</h5>
                <button type="button" className="btn-close" onClick={toggleModal}></button>
              </div>

              {/* Modal Body */}
              <div className="modal-body">
                {children}
              </div>

              {/* Modal Footer */}
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={toggleModal}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={onConfirm}>Confirm</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Backdrop */}
      {showModal && <div className="modal-backdrop show"></div>}
    </>
  )
}