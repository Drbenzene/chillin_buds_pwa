"use client"; 

import { useEffect, useState } from "react";
import { Formik, FormikProps, FormikValues } from 'formik';
import Papa from "papaparse";
import { toast } from "react-toastify";
import axios from 'axios'
import { BASE_URL } from "../constants";


const ProductUpload = (props: any) =>  {

  const [jsonFromCsv, setJsonFromCsv] = useState<any>([]);
  const [invalidJsonFromCsv, setInvalidJsonFromCsv] = useState<any>([]);
  const [showDownload, setShowDownload] = useState(false);
  const commonConfig = { delimiter: "," };
  const tableColumns = [
    {
      Header: 'First Name',
      accessor: 'first_name',
    },
    {
      Header: 'Last Name',
      accessor: 'last_name',
    },
    {
      Header: 'Guardian Phone Number',
      accessor: 'guardian_phone_number',
    }
  ];
  const rejectedTableColumns = [
    {
      Header: 'First Name',
      accessor: 'first_name',
    },
    {
      Header: 'Last Name',
      accessor: 'last_name',
    },
    {
      Header: 'Guardian Phone Number',
      accessor: 'guardian_phone_number',
    },
    {
      Header: 'Reason',
      accessor: 'reason',
    }
  ];
  const headers = [
    { label: "first_name", key: "first_name" },
    { label: "last_name", key: "last_name" },
    { label: "guardian_phone_number", key: "guardian_phone_number" },
    { label: "reason", key: "reason" }
  ];

  const validate = (values: FormikValues) => {   
    const errors: any = {};
    if (!values.products) {
        errors.products = 'Please upload a CSV file';
        setJsonFromCsv([]);
        setInvalidJsonFromCsv([]);
    }
    if(values.file){
      console.log(values, "THE VALUES")
      const format = values.file.name?.substring(values.file.name.lastIndexOf('.') + 1);
      if(format !== 'csv'){
        errors.products = 'Invalid format, only CSV can be uploaded';
      }else if(values.file.size > 524288){
        errors.products = 'File must not be more than 512 KB';
      } else {
        handleFileChange(values.file)
      }
    }
    return errors;
}

const handleFileChange = (file: File) => {
    Papa.parse(file, {
      ...commonConfig,
      complete: (result: any) => {
        const newData: any[] = [];
        const invalidData: any[] = [];
        result.data?.map((item: any[], index: number) => {
          if (index > 0) {
            const reformed: any = {}
            item.map((field: string, fieldIndex: number) => {
              reformed[result.data[0][fieldIndex]] = field;
            });
            // newData.push(reformed);
            console.log(reformed, "THE REFORMED")
            if(reformed.name !== "") {
              let formatted = {
                name: reformed?.name,
                cbd: reformed?.cbd,
                terpenes: reformed?.terpenes,
                thc: reformed?.thc,
                price: Number(reformed?.price) || 0,
                genetic_makeup: reformed?.genetic_makeup,
                terpene_percent: reformed?.terpene_percent,
                indica: reformed?.indica,
                sativa: reformed?.sativa,
                hybrid: reformed?.hybrid,
                description: reformed?.description,
                flavours: reformed?.flavours,
                effects: reformed?.effects,
                image: reformed?.image,
                landrace:reformed.landrace,
                gassy: reformed.gassy,
                fruity: reformed.fruity,
                originate: reformed?.originate,
                helps: reformed?.helps,
                apetite: reformed?.apetite,
                head_body: reformed.head_body
              }
              newData.push(formatted);
            }
          }
        })
        setJsonFromCsv(newData);
        setInvalidJsonFromCsv(invalidData);
      }
   });
  }
  
  console.log(jsonFromCsv, "NA ME NA HAM")
  const checkName = (e: any) => {
    const regex = new RegExp('^[a-zA-Z ]+$');
    if (e && regex.test(e)) {
      return true;
    } else {
      return false;
    }
  };
  


  const moveBulkToNominated = (values: any, controls: any) => {
    if(jsonFromCsv.length === 0) {
      if(invalidJsonFromCsv.length > 0) {
        // toast.warning('You are trying to upload records with invalid data, please check and upload again');
        controls.setSubmitting(false);
        return;
      }
    //   toast.warning('You are trying to upload an empty/invalid file, please change to file with valid data');
      controls.setSubmitting(false);
      return;
    }
     if(invalidJsonFromCsv.length > 0) {
    //   toast.warning('Please note that only valid records were uploaded');
    }
    setShowDownload(false);
    const rejectedChildren: any = [];
    const data = {products: jsonFromCsv}
    console.log(data, "THE DATAAAAA")

    axios.post(`http://localhost:5000/products/upload`, data)
    .then((res: any) => {
        console.log(res, "THE RESSSS")
        controls.setSubmitting(false)
    }).catch ((err) => {
        console.log(err, "THE ERRRR")
        controls.setSubmitting(false);

    })



  }

  useEffect(() => {
    // openModal();
  }, [props])

  return (
    <div className="app-data-modal">
      <div className="modal-bg"></div>
      <div className={"modal-container large"}>
        <div className="modal-content">
          
          {/* Any content goes in here */}
          <div>
            <Formik initialValues={{
                products: ''
            }}
            validate={(value) => validate(value)}
            onSubmit={(values, controls) => moveBulkToNominated(values, controls)}
            >
                {
                    (props: FormikProps<{
                        products: string
                    }>) => {
                        const {
                            values,
                            errors,
                            touched,
                            isSubmitting,
                            setFieldValue,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                        } = props;
                        return (
                            <form action="" onSubmit={handleSubmit} style={{padding: '15px'}}>
                                <div className='styled-form'>
                                  <h4 className="text-center">Upload Products</h4>
                                  <div className="pt-3 text-center text-success">
                                    <a href='' target={'_blank'} download="sample_children_nomination.csv">
                                      <i className="fa-solid fa-cloud-arrow-down increased-x"></i>
                                    </a>
                                    <a href='' target={'_blank'} download="sample_children_nomination.csv">
                                      <p className="reduced">Download sample file</p>
                                    </a>
                                    
                                  </div>
                                  <label>Upload CSV Files</label>
                                  <input
                                      type="file"
                                      id='products'
                                      value={values.products}
                                      onBlur={handleBlur}
                                      onChange={(event: any) => {
                                        handleChange(event);
                                        setFieldValue("file", event.currentTarget.files[0]);
                                      }}
                                      className={(errors.products && touched.products) ? 'im-error' : ''}
                                  />
                                  {
                                      errors.products && touched.products &&
                                      <p className='reduced error-popup pt-1 mb-0'>{errors.products}</p>
                                  }
                              </div>
                              
                              {
                                !showDownload && jsonFromCsv.length > 0 &&
                                <>
                                  <h6 className="pt-3 text-center increased">Valid Records</h6>
                                  {/* <DataTables hidePagination data={jsonFromCsv} columns={tableColumns}/> */}
                                </>
                              }
                              {
                                jsonFromCsv.length === 0 && invalidJsonFromCsv.length > 0 &&
                                <h6 className="text-center pt-3 text-danger">No Valid Records</h6>
                              }
                              {
                                !showDownload && invalidJsonFromCsv.length > 0 &&
                                <>
                                  <h6 className="pt-3 text-center increased">Invalid Records</h6>
                                  {/* <DataTables hidePagination data={invalidJsonFromCsv} columns={rejectedTableColumns}/> */}
                                </>
                              }
                              <div className='text-center pt-3 pb-2'> 
                                {
                                  !showDownload && 
                                  <>
                                    <button type='button' className='btn btn-danger mx-0 mr-3 text-black' disabled={isSubmitting}>Cancel</button>
                                    <button type='submit' className='btn btn-success mx-0 text-black' disabled={isSubmitting}>{isSubmitting ? 'Processing..' : 'Submit'}</button>
                                  </>
                                }
                                {/* {showDownload && <CSVLink
                                  headers={headers}
                                  enclosingCharacter={``}
                                  data={rejectedChildrenArrray}
                                  filename={"rejected-children-nomination-file.csv"}
                                  className="btn btn-primary ml-2"
                                  target="_blank"
                                >
                                  Download Records
                                </CSVLink>} */}
                                {
                                  showDownload && 
                                  <button type='button' className='btn btn-light ml-2'>Close</button>
                                }
                              </div>
                            </form>
                        );
                    }
                }
            </Formik>
          </div>
          {/* Content ends  here */}

        </div>
      </div>
    </div>
  );
}

export default ProductUpload