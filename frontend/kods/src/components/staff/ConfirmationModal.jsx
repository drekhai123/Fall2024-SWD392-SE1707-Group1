import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

const ConfirmationModal = ({ visible, onHide, onConfirm }) => {
  return (
    <Dialog header="Confirm Delivery" visible={visible} onHide={onHide}>
      <p>Do you want to start a delivery?</p>
      <div className="flex justify-content-end">
        <Button label="No" onClick={onHide} className="p-button-text" />
        <Button label="Yes" onClick={onConfirm} autoFocus />
      </div>
    </Dialog>
  );
};

export default ConfirmationModal; 