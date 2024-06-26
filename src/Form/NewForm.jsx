const NewForm = () => {
  
    return (
      <div className='flex flex-row p-4'>
        <form className='mx-auto w-max'>
          <div className='mb-4 text-3xl font-bold'>Insert Your Parents Details...</div>
          <div className='flex flex-row mb-4'>
            <div className='mr-10'>
              <label className='block mb-1 text-sm font-bold'>First Name:</label>
              <input id='firstname' type="text" className='w-full px-12 py-2 border rounded-md' />
            </div>
            <div className='mr-10'>
              <label className='block mb-1 text-sm font-bold'>Middle Name:</label>
              <input id='middlename' type="text" className='w-full px-12 py-2 border rounded-md' />
            </div>
            <div className='mr-10'>
              <label className='block mb-1 text-sm font-bold'>Last Name:</label>
              <input id='lastname' type="text" className='w-full px-12 py-2 border rounded-md' />
            </div>
            
          </div>
          <div className='flex flex-row mb-4'>
              <div className='mr-10'>
              <label className='block mb-1 text-sm font-bold'>Nationality:</label>
              <input id='nationality' type="text" className='w-full px-12 py-2 border rounded-md' />
              </div>
              <div className='mr-10'>
              <label className='block mb-1 text-sm font-bold'>Permanent Address:</label>
              <input id='permanentaddress' type="text" className='w-full px-12 py-2 border rounded-md' />
              </div>
              <div className='mr-10'>
              <label className='block mb-1 text-sm font-bold'>Municipality/VDC,Ward no:</label>
              <input id='municipality' type="text" className='w-full px-20 py-2 border rounded-md' />
              </div>
            </div>
            <div  className='flex flex-row mb-4'>
            <div className='mr-10'>
            <label className='block mb-1 text-sm font-bold'>Mobile/Phone no:</label>
              <input id='phonenumber' type="number" className='px-6 py-2 border rounded-md ' />
            </div>
            <div className='mr-10'>
              <label className='block mb-1 text-sm font-bold'>Current Address:</label>
              <input id='currentaddress' type="text" className='w-full px-12 py-2 border rounded-md' />
              </div>
              <div className='mr-10'>
              <label className='block mb-1 text-sm font-bold'>Age:</label>
              <input id='age' type="number" className='w-full px-12 py-2 border rounded-md' />
              </div>
              <div className='mr-10'>
              <label className='block mb-1 text-sm font-bold'>Gender:</label>
              <div className='w-full px-12 py-2 border rounded-md '>
              <input type="radio" id="gender" name="gender" value="Male" />
              <label>Male  </label>
              <input type="radio" id="gender" name="gender" value="Female" />
              <label>Female  </label>
              <input type="radio" id="gender" name="gender" value="Others" />
              <label>Others  </label>
              </div>
            </div>
          </div>
            <div className='flex flex-row mb-4'>
            <div className='mr-10'>
              <label className='block mb-1 text-sm font-bold'>Date Of Birth:</label>
              <input id='dob' type="date" className='w-full px-12 py-2 border rounded-md' />
              </div>
              <div className='mr-10'>
              <label className='block mb-1 text-sm font-bold'>Citizenship Issued Date:</label>
              <input id='citizenshipissueno' type="number" className='w-full px-12 py-2 border rounded-md' />
              </div>
              <div className='mr-10'>
              <label className='block mb-1 text-sm font-bold'>Citizenship No:</label>
              <input id='citizenshipno' type="number" className='w-full px-12 py-2 border rounded-md' />
              </div>
              <div className='mr-10'>
              <label className='block mb-1 text-sm font-bold'>Email:</label>
              <input id='email' type="email" className='w-full px-12 py-2 border rounded-md' />
              </div>
            </div>
           
            <div className='flex flex-row mb-4'>
            <div className='mr-10'>
              <label className='block mb-1 text-sm font-bold'>Disability:</label>
              <div className='w-full px-12 py-2 border rounded-md '>
              <input id='disability' type="radio" name='disability' value= 'yes'  />
              <label>Yes  </label>
              <input id='disability' type="radio" name='disability' value= 'no'  />
              <label>No  </label>
              </div>
              </div>
              <div className='mr-10'>
              <label className='block mb-1 text-sm font-bold'>If Disability yes please Mention:</label>
              <textarea name="textarea" id="textarea" cols="100" rows="10"  className='border rounded-md'></textarea>
              </div>
            </div>
            <div className='flex flex-row mb-4'>
            <div className='mr-10'>
              <label className='block mb-1 text-sm font-bold'>Maritial Status:</label>
              <div className='w-full px-12 py-2 border rounded-md '>
              <input type="radio" id="maritialstatus" name="maritialstatus" value="Married" />
              <label>Married  </label>
              <input type="radio" id="maritialstatus" name="maritialstatus" value="Unmarried" />
              <label>Unmarried  </label>
              <input type="radio" id="maritialstatus" name="maritialstatus" value="Divorsed" />
              <label>Divorsed  </label>
              </div>
              </div>
            </div>
            <div className='flex flex-row mb-4'>
            <div className='mr-10'>
              <label className='block mb-1 text-sm font-bold'>Any Health Issue:</label>
              <div className='w-full px-12 py-2 border rounded-md '>
              <input id='disability' type="radio" name='disability' value= 'yes'  />
              <label>Yes  </label>
              <input id='disability' type="radio" name='disability' value= 'no'  />
              <label>No  </label>
              </div>
              </div>
              <div className='mr-10'>
              <label className='block mb-1 text-sm font-bold'>If any health issue please Mention:</label>
              <textarea name="textarea" id="textarea" cols="100" rows="10" className='border rounded-md'></textarea>
              </div>
            </div>
            <div className='flex flex-row mb-4'>
           
              <div className='mr-10'>
              <label className='block mb-1 text-sm font-bold'>Wife/Husband Name:</label>
              <input id='name' type="text" className='w-full px-12 py-2 border rounded-md' />
              </div>
              <div className='mr-10'>
              <label className='block mb-1 text-sm font-bold'>Father Name:</label>
              <input id='name' type="text" className='w-full px-12 py-2 border rounded-md' />
              </div>
              <div className='mr-10'>
              <label className='block mb-1 text-sm font-bold'>Mother Name:</label>
              <input id='name' type="text" className='w-full px-12 py-2 border rounded-md' />
              </div>
            </div>
            <div  className='flex flex-row mb-4'>
            <div className='mr-10'>
              <label className='block mb-1 text-sm font-bold'>Any Query or Expectation:</label>
              <textarea name="textarea" id="textarea" cols="100" rows="15" className='border rounded-md'></textarea>
              </div>
            </div>
            <button type='submit' className='py-2 transition-colors bg-center rounded-md pz-4 hover:bg-slate-500'>Submit</button>
        </form>
        
      </div>
      
      
    )
  }
