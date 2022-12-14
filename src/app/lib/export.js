import { export_wizard } from '../model/model_api';
import swal from 'sweetalert';
export function exports_data(props) {
  const { sesion, attribute, manualNames } = props;
  const form_data = new FormData();
  const phase = sessionStorage.getItem('phase');
  const dataEdit = sessionStorage.getItem('dataEdit');
  const content = localStorage.getItem('_contens');
  const config = localStorage.getItem('config');
  const manualName = JSON.stringify(manualNames);

  //   ====== phase ======================
  form_data.append('phase', phase != undefined ? phase : 'created');
  if (dataEdit != undefined && dataEdit != undefined) {
    form_data.append('dataEdit', sessionStorage.getItem('dataEdit'));
  }
  // =====================================

  form_data.append('code', content); //editor.getData()
  form_data.append('session_code', sesion);
  form_data.append('config', config);
  form_data.append('manual_name', manualName);
  form_data.append('attribute', JSON.stringify(attribute));
  export_wizard(form_data, (res) => {
    var refreshIntervalId = setInterval(() => {
      swal('Success', 'Export Success', 'success').then((ev) => {
        if (ev) {
          editor.setData('');
          localStorage.clear();
          sessionStorage.removeItem('dataEdit');
          sessionStorage.setItem('phase', 'created');
        }
      });
      $('.containerLoadingFull').addClass('hide-load').removeClass('show-load');
      clearInterval(refreshIntervalId);
    }, 2000);
  });
}
