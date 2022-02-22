import React, {useState} from 'react';

import {Modal} from "./components/Modal";
import {ExportReportForm} from "./components/ExportReportForm";


function App() {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="App">
            <button className="open-modal-btn"
                    onClick={() => setIsModalVisible(true)}
            >
                Open Modal Component
            </button>
            <Modal
                isModalVisible={isModalVisible}
                content={<ExportReportForm close={handleCancel}/>}
            />
        </div>
    );

}

export default App;
