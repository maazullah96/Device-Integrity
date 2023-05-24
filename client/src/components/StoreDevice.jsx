import React from 'react';
import { Container, Row, Col, Form, Button, Card,Alert,Spinner   } from 'react-bootstrap';
import { useState } from 'react';
import { useFormik } from 'formik';
import { ethers } from 'ethers';

const StoreDevice = ({ state }) => {
  const initialValues = {
    deviceId: '',
    staticParams: {
      networkInterface: '',
      hostname: '',
      osArchitecture: '',
      logicalCPU: '',
      osPlatform: '',
      osVersion: '',
      osRelease: '',
      macAddress : '' ,
      firmwareVersion : '' ,
      userPassPhrase : '',
      uuID: ''
    },
    dynamicParams: {
      minAvailableMemory: 0,
      maxAvailableMemory: 0,
      minCpuUsage: 0,
      maxCpuUsage: 0,
      minCpuPercentage: 0,
      maxCpuPercentage: 0,
      minNetworkBandwidth: 0,
      maxNetworkBandwidth: 0,
    },
  };
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const onSubmit = async (values) => {
    setSubmitting(true);
    setSubmitError(false);
    setSubmitSuccess(false);

    try {
      const { deviceId, staticParams, dynamicParams } = values;
      const device_id_byte = ethers.utils.formatBytes32String(deviceId);

      const transaction = await state.contract.storeDevice(device_id_byte, staticParams, dynamicParams);
      await transaction.wait();
      console.log('Transaction is done');

      setSubmitSuccess(true);
      formik.resetForm();
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };
  
  const validate = (values) => {
    const errors = {};
  
    if (!values.deviceId) {
      errors.deviceId = 'Device ID is required';
    }
  
    if (!values.staticParams) {
      errors.staticParams = {};
    }
  
    if (!values.staticParams.networkInterface) {
      errors.staticParams.networkInterface = 'Network Interface is required';
    }
  
    if (!values.staticParams.hostname) {
      errors.staticParams.hostname = 'Host Name is required';
    }
  
    if (!values.staticParams.osArchitecture) {
      errors.staticParams.osArchitecture = 'OS Architecture is required';
    }
  
    if (!values.staticParams.logicalCPU) {
      errors.staticParams.logicalCPU = 'Logical CPU is required';
    }
  
    if (!values.staticParams.osPlatform) {
      errors.staticParams.osPlatform = 'OS Platform is required';
    }
  
    if (!values.staticParams.osVersion) {
      errors.staticParams.osVersion = 'OS Version is required';
    }
    if (!values.staticParams.osRelease) {
      errors.staticParams.osRelease = 'OS Release is required';
    }
  
    if (!values.staticParams.macAddress) {
      errors.staticParams.macAddress = 'macAddress   is required';
    }
    if (!values.staticParams.firmwareVersion) {
      errors.staticParams.firmwareVersion = 'firmwareVersion is required';
    }
    if (!values.staticParams.userPassPhrase) {
      errors.staticParams.userPassPhrase = 'user PassPhrase  is required';
    }
    if (!values.staticParams.uuID) {
      errors.staticParams.uuID = 'uuID  is required';
    }
    if (!values.dynamicParams) {
      errors.dynamicParams = {};
    }
  
  
    if (!values.dynamicParams.minAvailableMemory) {
      errors.dynamicParams.minAvailableMemory = 'Minimum Available Memory is required';
    }
  
    if (!values.dynamicParams.maxAvailableMemory) {
      errors.dynamicParams.maxAvailableMemory = 'Maximum Available Memory is required';
    }
  
  
  
    if (!values.dynamicParams.minCpuUsage) {
      errors.dynamicParams.minCpuUsage = 'Minimum CPU Usage is required';
    }
  
    if (!values.dynamicParams.maxCpuUsage) {
      errors.dynamicParams.maxCpuUsage = 'Maximum CPU Usage is required';
    }
    if (!values.dynamicParams.minCpuPercentage) {
      errors.dynamicParams.minCpuPercentage = 'Minimum Cpu Percentage is required';
    }

    if (!values.dynamicParams.maxCpuPercentage) {
      errors.dynamicParams.maxCpuPercentage = 'Maximum CPU Percentage is required';
    }
    
    if (!values.dynamicParams.minNetworkBandwidth) {
      errors.dynamicParams.minNetworkBandwidth = 'Minimum Network Bandwidth is required';
    }
    if (!values.dynamicParams.maxNetworkBandwidth) {
      errors.dynamicParams.maxNetworkBandwidth = 'Maximum Network Bandwidth is required';
    }
  
    return errors;
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate, 
  });

  return (
    <Container>
      <Row className="justify-content-md-center mt-4">
        <Col xs={12} md={12}>
          <Form onSubmit={formik.handleSubmit}>
            <Card>
              <Card.Body>
                <Row>
                  <Form.Group className="mb-3" controlId="device_id">
                    <Form.Label>Device ID</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter device ID"
                      {...formik.getFieldProps('deviceId')}
                    />
                  </Form.Group>
                </Row>
              </Card.Body>
            </Card>
            
            {/* Static Parameters */}
            <Card className="mt-4">
              <Card.Body>
                <Card.Title>Static Parameters</Card.Title>
                <Row>
                  <Col md={3}>
                    <Form.Group className="mb-3" controlId="network_interface">
                      <Form.Label>Network Interface</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter network interface"
                        {...formik.getFieldProps('staticParams.networkInterface')}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3" controlId="host_name">
                      <Form.Label>Host Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter host name"
                        {...formik.getFieldProps('staticParams.hostname')}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3" controlId="logical_cpu">
                      <Form.Label>Logical CPU Threads</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter logical CPU"
                        {...formik.getFieldProps('staticParams.logicalCPU')}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3" controlId="uuID">
                      <Form.Label>DeviceUUID</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter UUID"
                        {...formik.getFieldProps('staticParams.uuID')}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3" controlId="macAddress">
                      <Form.Label>Mac Address</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Mac Address"
                        {...formik.getFieldProps('staticParams.macAddress')}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3" controlId="firmwareVersion">
                      <Form.Label>FirmWare Version</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Firmware Version"
                        {...formik.getFieldProps('staticParams.firmwareVersion')}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3" controlId="userPassPhrase">
                      <Form.Label>UserPass Phrase</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter UserPass Phrase"
                        {...formik.getFieldProps('staticParams.userPassPhrase')}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={3}>
                    <Form.Group className="mb-3" controlId="os_architecture">
                      <Form.Label>OS Architecture</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter OS architecture"
                        {...formik.getFieldProps('staticParams.osArchitecture')}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3" controlId="os_platform">
                      <Form.Label>OS Platform</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter OS platform"
                        {...formik.getFieldProps('staticParams.osPlatform')}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3" controlId="os_version">
                      <Form.Label>OS Version</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter OS version"
                        {...formik.getFieldProps('staticParams.osVersion')}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3" controlId="os_release">
                      <Form.Label>OS Release</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter OS release"
                        {...formik.getFieldProps('staticParams.osRelease')}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Dynamic Parameters */}
            <Card className="mt-4">
              <Card.Body>
                <Card.Title>Dynamic Parameters</Card.Title>
                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3" controlId="min_available_memory">
                      <Form.Label>Minimum Available Memory</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter minimum available memory"
                        {...formik.getFieldProps('dynamicParams.minAvailableMemory')}
                      />
                    </Form.Group>
                  </Col>
                  
                  <Col md={4}>
                    <Form.Group className="mb-3" controlId="max_available_memory">
                      <Form.Label>Maximum Available Memory</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter maximum available memory"
                        {...formik.getFieldProps('dynamicParams.maxAvailableMemory')}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3" controlId="min_cpu_usage">
                      <Form.Label>Minimum CPU Usage</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter minimum CPU usage"
                        {...formik.getFieldProps('dynamicParams.minCpuUsage')}
                      />
                    </Form.Group>
                  </Col>
                  
                  <Col md={4}>
                    <Form.Group className="mb-3" controlId="max_cpu_usage">
                      <Form.Label>Maximum CPU Usage</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter maximum CPU usage"
                        {...formik.getFieldProps('dynamicParams.maxCpuUsage')}
                      />
                    </Form.Group>
                  </Col>
                </Row>


                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3" controlId="min_cpu_percentage">
                      <Form.Label>Minimum CPU Percentage</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter minimum CPU Percentage"
                        {...formik.getFieldProps('dynamicParams.minCpuPercentage')}
                      />
                    </Form.Group>
                  </Col>
                  
                  <Col md={4}>
                    <Form.Group className="mb-3" controlId="max_cpu_percentage">
                      <Form.Label>Maximum CPU Percentage</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter maximum CPU Percentage"
                        {...formik.getFieldProps('dynamicParams.maxCpuPercentage')}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3" controlId="min_network_bandwidth">
                      <Form.Label>Minimum Network Bandwidth</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter minimum Network Bandwidth"
                        {...formik.getFieldProps('dynamicParams.minNetworkBandwidth')}
                      />
                    </Form.Group>
                  </Col>
                  
                  <Col md={4}>
                    <Form.Group className="mb-3" controlId="max_network_bandwidth">
                      <Form.Label>Maximum Network Bandwidth</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter maximum Network Bandwidth"
                        {...formik.getFieldProps('dynamicParams.maxNetworkBandwidth')}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

           {/* Submit Button */}
           <Button variant="primary" type="submit" disabled={submitting}>
              {submitting ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Submitting...
                </>
              ) : (
                'Submit'
              )}
            </Button>

            {/* Success and Error alerts */}
            {submitSuccess && (
              <Alert variant="success" className="mt-3">
                Data submitted successfully.
              </Alert>
            )}

            {submitError && (
              <Alert variant="danger" className="mt-3">
                Error submitting data. Please try again.
              </Alert>
            )}
  
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default StoreDevice;










// import React from 'react';
// import { Container, Row, Col, Form, Button, Card,Alert,Spinner   } from 'react-bootstrap';
// import { useState } from 'react';
// import { useFormik } from 'formik';
// import { ethers } from 'ethers';

// const StoreDevice = ({ state }) => {
//   const initialValues = {
//     deviceId: '',
//     staticParams: {
//       networkInterface: '',
//       hostname: '',
//       osArchitecture: '',
//       logicalCPU: '',
//       osPlatform: '',
//       osVersion: '',
//       osRelease: '',
//     },
//     dynamicParams: {
//       availableMemory: 0,
//       minAvailableMemory: 0,
//       maxAvailableMemory: 0,
//       cpuUsage: 0,
//       minCpuUsage: 0,
//       maxCpuUsage: 0,
//     },
//   };
//   const [submitting, setSubmitting] = useState(false);
//   const [submitError, setSubmitError] = useState(false);
//   const [submitSuccess, setSubmitSuccess] = useState(false);

//   const onSubmit = async (values) => {
//     setSubmitting(true);
//     setSubmitError(false);
//     setSubmitSuccess(false);

//     try {
//       const { deviceId, staticParams, dynamicParams } = values;
//       const device_id_byte = ethers.utils.formatBytes32String(deviceId);

//       const transaction = await state.contract.storeDevice(device_id_byte, staticParams, dynamicParams);
//       await transaction.wait();
//       console.log('Transaction is done');

//       setSubmitSuccess(true);
//       formik.resetForm();
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       setSubmitError(true);
//     } finally {
//       setSubmitting(false);
//     }
//   };
  
//   const validate = (values) => {
//     const errors = {};
  
//     if (!values.deviceId) {
//       errors.deviceId = 'Device ID is required';
//     }
  
//     if (!values.staticParams) {
//       errors.staticParams = {};
//       errors.staticParams.networkInterface = 'Network Interface is required';
//       errors.staticParams.hostname = 'Host Name is required';
//       errors.staticParams.osArchitecture = 'OS Architecture is required';
//       errors.staticParams.logicalCPU = 'Logical CPU is required';
//       errors.staticParams.osPlatform = 'OS Platform is required';
//       errors.staticParams.osVersion = 'OS Version is required';
//       errors.staticParams.osRelease = 'OS Release is required';
//     } else {
//       const { staticParams } = values;
//       errors.staticParams = {};
  
//       if (!staticParams.networkInterface) {
//         errors.staticParams.networkInterface = 'Network Interface is required';
//       }
  
//       if (!staticParams.hostname) {
//         errors.staticParams.hostname = 'Host Name is required';
//       }
  
//       if (!staticParams.osArchitecture) {
//         errors.staticParams.osArchitecture = 'OS Architecture is required';
//       }
  
//       if (!staticParams.logicalCPU) {
//         errors.staticParams.logicalCPU = 'Logical CPU is required';
//       }
  
//       if (!staticParams.osPlatform) {
//         errors.staticParams.osPlatform = 'OS Platform is required';
//       }
  
//       if (!staticParams.osVersion) {
//         errors.staticParams.osVersion = 'OS Version is required';
//       }
  
//       if (!staticParams.osRelease) {
//         errors.staticParams.osRelease = 'OS Release is required';
//       }
//     }
  
//     if (!values.dynamicParams) {
//       errors.dynamicParams = {};
//       errors.dynamicParams.availableMemory = 'Available Memory is required';
//       errors.dynamicParams.minAvailableMemory = 'Minimum Available Memory is required';
//       errors.dynamicParams.maxAvailableMemory = 'Maximum Available Memory is required';
//       errors.dynamicParams.cpuUsage = 'CPU Usage is required';
//       errors.dynamicParams.minCpuUsage = 'Minimum CPU Usage is required';
//       errors.dynamicParams.maxCpuUsage = 'Maximum CPU Usage is required';
//     } else {
//       const { dynamicParams } = values;
//       errors.dynamicParams = {};
  
//       if (!dynamicParams.availableMemory) {
//         errors.dynamicParams.availableMemory = 'Available Memory is required';
//       }
  
//       if (!dynamicParams.minAvailableMemory) {
//         errors.dynamicParams.minAvailableMemory = 'Minimum Available Memory is required';
//       }
  
//       if (!dynamicParams.maxAvailableMemory) {
//         errors.dynamicParams.maxAvailableMemory = 'Maximum Available Memory is required';
//       }
  
//       if (!dynamicParams.cpuUsage) {
//         errors.dynamicParams.cpuUsage = 'CPU Usage is required';
//       }
  
//       if (!dynamicParams.minCpuUsage) {
//         errors.dynamicParams.minCpuUsage = 'Minimum CPU Usage is required';
//       }
  
//       if (!dynamicParams.maxCpuUsage) {
//         errors.dynamicParams.maxCpuUsage = 'Maximum CPU Usage is required';
//       }
//     }
  
//     return errors;
//   };
//   const formik = useFormik({
//     initialValues,
//     onSubmit,
//     validate, 
//   // validateOnChange: true,
//   // validateOnBlur: true,
//   });


  
//   const randomizeValues = () => {
//     const randomString = () =>
//       Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

//     formik.setFieldValue('deviceId', randomString());
//     formik.setFieldValue('staticParams.networkInterface', randomString());
//     formik.setFieldValue('staticParams.hostname', randomString());
//     formik.setFieldValue('staticParams.osArchitecture', randomString());
//     formik.setFieldValue('staticParams.logicalCPU', randomString());
//     formik.setFieldValue('staticParams.osPlatform', randomString());
//     formik.setFieldValue('staticParams.osVersion', randomString());
//     formik.setFieldValue('staticParams.osRelease', randomString());
//     formik.setFieldValue('dynamicParams.availableMemory', Math.floor(Math.random() * 100));
//     formik.setFieldValue('dynamicParams.minAvailableMemory', Math.floor(Math.random() * 100));
//     formik.setFieldValue('dynamicParams.maxAvailableMemory', Math.floor(Math.random() * 100));
//     formik.setFieldValue('dynamicParams.cpuUsage', Math.floor(Math.random() * 100));
//     formik.setFieldValue('dynamicParams.minCpuUsage', Math.floor(Math.random() * 100));
//     formik.setFieldValue('dynamicParams.maxCpuUsage', Math.floor(Math.random() * 100));
//   };

//   return (
//     <Container>
//       <Row className="justify-content-md-center mt-4">
//         <Col xs={12} md={12}>

            

//           <Form onSubmit={formik.handleSubmit}>
         

//             <Card>
//               <Card.Body>
//                 <Row>
//                   <Form.Group className="mb-3" controlId="device_id">
//                     <Form.Label>Device ID</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Enter device ID"
//                       {...formik.getFieldProps('deviceId')}
//                     />
//                   </Form.Group>
//                 </Row>
//               </Card.Body>
//             </Card>
            
//             {/* Static Parameters */}
//             <Card className="mt-4">
//               <Card.Body>
//                 <Card.Title>Static Parameters</Card.Title>
//                 <Row>
//                   <Col md={4}>
//                     <Form.Group className="mb-3" controlId="network_interface">
//                       <Form.Label>Network Interface</Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder="Enter network interface"
//                         {...formik.getFieldProps('staticParams.networkInterface')}
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={4}>
//                     <Form.Group className="mb-3" controlId="host_name">
//                       <Form.Label>Host Name</Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder="Enter host name"
//                         {...formik.getFieldProps('staticParams.hostname')}
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={3}>
//                     <Form.Group className="mb-3" controlId="logical_cpu">
//                       <Form.Label>Logical CPU</Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder="Enter logical CPU"
//                         {...formik.getFieldProps('staticParams.logicalCPU')}
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 <Row>
//                   <Col md={3}>
//                     <Form.Group className="mb-3" controlId="os_architecture">
//                       <Form.Label>OS Architecture</Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder="Enter OS architecture"
//                         {...formik.getFieldProps('staticParams.osArchitecture')}
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={3}>
//                     <Form.Group className="mb-3" controlId="os_platform">
//                       <Form.Label>OS Platform</Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder="Enter OS platform"
//                         {...formik.getFieldProps('staticParams.osPlatform')}
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={3}>
//                     <Form.Group className="mb-3" controlId="os_version">
//                       <Form.Label>OS Version</Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder="Enter OS version"
//                         {...formik.getFieldProps('staticParams.osVersion')}
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={3}>
//                     <Form.Group className="mb-3" controlId="os_release">
//                       <Form.Label>OS Release</Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder="Enter OS release"
//                         {...formik.getFieldProps('staticParams.osRelease')}
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>
//               </Card.Body>
//             </Card>

//             {/* Dynamic Parameters */}
//             <Card className="mt-4">
//               <Card.Body>
//                 <Card.Title>Dynamic Parameters</Card.Title>
//                 <Row>
//                   <Col md={4}>
//                     <Form.Group className="mb-3" controlId="min_available_memory">
//                       <Form.Label>Minimum Available Memory</Form.Label>
//                       <Form.Control
//                         type="number"
//                         placeholder="Enter minimum available memory"
//                         {...formik.getFieldProps('dynamicParams.minAvailableMemory')}
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={4}>
//                     <Form.Group className="mb-3" controlId="available_memory">
//                       <Form.Label>Available Memory</Form.Label>
//                       <Form.Control
//                         type="number"
//                         placeholder="Enter available memory"
//                         {...formik.getFieldProps('dynamicParams.availableMemory')}
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={4}>
//                     <Form.Group className="mb-3" controlId="max_available_memory">
//                       <Form.Label>Maximum Available Memory</Form.Label>
//                       <Form.Control
//                         type="number"
//                         placeholder="Enter maximum available memory"
//                         {...formik.getFieldProps('dynamicParams.maxAvailableMemory')}
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 <Row>
//                   <Col md={4}>
//                     <Form.Group className="mb-3" controlId="min_cpu_usage">
//                       <Form.Label>Minimum CPU Usage</Form.Label>
//                       <Form.Control
//                         type="number"
//                         placeholder="Enter minimum CPU usage"
//                         {...formik.getFieldProps('dynamicParams.minCpuUsage')}
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={4}>
//                     <Form.Group className="mb-3" controlId="cpu_usage">
//                       <Form.Label>CPU Usage</Form.Label>
//                       <Form.Control
//                         type="number"
//                         placeholder="Enter CPU usage"
//                         {...formik.getFieldProps('dynamicParams.cpuUsage')}
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={4}>
//                     <Form.Group className="mb-3" controlId="max_cpu_usage">
//                       <Form.Label>Maximum CPU Usage</Form.Label>
//                       <Form.Control
//                         type="number"
//                         placeholder="Enter maximum CPU usage"
//                         {...formik.getFieldProps('dynamicParams.maxCpuUsage')}
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>
//               </Card.Body>
//             </Card>

//            {/* Submit Button */}
//            <Button variant="primary" type="submit" disabled={submitting }>
//               {submitting ? (
//                 <>
//                   <Spinner animation="border" size="sm" className="me-2" />
//                   Submitting...
//                 </>
//               ) : (
//                 'Submit'
//               )}
//             </Button>

//             {/* <Button variant="primary" type="submit" disabled={!state.contract}>
// //               Submit
// //             </Button> */}
//  {/* Success and Error alerts */}
//  {submitSuccess && (
//               <Alert variant="success" className="mt-3">
//                 Data submitted successfully.
//               </Alert>
//             )}

//             {submitError && (
//               <Alert variant="danger" className="mt-3">
//                 Error submitting data. Please try again.
//               </Alert>
//             )}

//                  {/* Missing fields alert */}
// //         {formik.touched && formik.errors && (
//           <Alert variant="danger" className="mt-3">
//           Please fill in all required fields.
//           </Alert>
//         )}

// {/* {formik.touched && Object.keys(formik.errors).length > 0 && (
//   <Alert variant="danger" className="mt-3">
//     {Object.keys(formik.errors).map((key, index) => {
//       if (key === "staticParams" || key === "dynamicParams") {
//         const subErrors = formik.errors[key];
//          Object.keys(subErrors).map((subKey, subIndex) => (
//           <div key={`${key}-${subKey}-${subIndex}`}>
//             {subErrors[subKey]}
//           </div>
//         ));
//       } else {
//          <div key={index}>{formik.errors[key]}</div>;
//       }
//     })}
//   </Alert>
// )} */}
//           </Form>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default StoreDevice;



