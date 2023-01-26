import React from "react";
import ModalCreate from "./components/ModalCreate";

import "./App.css";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      sisaUang: 0,
      persentaseUang: 0,
      pemasukanUang: 0,
      pengeluaranUang: 0,
      transaksiIn: 0,
      transaksiOut: 0,
      sumarry: [
        {
          deskripsi: "Menerima Gaji",
          tanggal: "26 Januari",
          nominal: 8000000,
          kategori: "IN",
        },
        {
          deskripsi: "Traveling",
          tanggal: "26 Januari",
          nominal: 1000000,
          kategori: "OUT",
        },
      ],
    };

    this.tambahItem = this.tambahItem.bind(this);
    this.fnHitung = this.fnHitung.bind(this);
  }

  tambahItem(object) {
    let newData = [...this.state.sumarry, object];

    let dataUangIn = newData.filter((item) => item.kategori === "IN");
    let nominalIn = dataUangIn.map((item) => item.nominal);
    let jumlahIn = nominalIn.reduce((total, num) => total + num);

    let dataUangOut = newData.filter((item) => item.kategori === "OUT");
    let nominalOut = dataUangOut.map((item) => item.nominal);
    let jumlahOut = nominalOut.reduce((total, num) => total + num);

    let uangSisa = jumlahIn - jumlahOut;
    let persentase = Math.round((uangSisa / jumlahIn) * 100);

    this.setState({
      pemasukanUang: jumlahIn,
      transaksiIn: nominalIn.length,
      pengeluaranUang: jumlahOut,
      transaksiOut: nominalOut.length,
      sisaUang: uangSisa,
      persentaseUang: persentase,
      sumarry: newData,
    });

    // console.log(object);
    // this.setState({
    //   sumarry: [...this.state.sumarry, object],
    // });
  }

  fnHitung() {
    let dataUangIn = this.state.sumarry.filter(
      (item) => item.kategori === "IN"
    );
    let nominalIn = dataUangIn.map((item) => item.nominal);
    let jumlahIn = nominalIn.reduce((total, num) => total + num);

    let dataUangOut = this.state.sumarry.filter(
      (item) => item.kategori === "OUT"
    );
    let nominalOut = dataUangOut.map((item) => item.nominal);
    let jumlahOut = nominalOut.reduce((total, num) => total + num);

    let uangSisa = jumlahIn - jumlahOut;
    let persentase = Math.round((uangSisa / jumlahIn) * 100);

    this.setState({
      pemasukanUang: jumlahIn,
      transaksiIn: nominalIn.length,
      pengeluaranUang: jumlahOut,
      transaksiOut: nominalOut.length,
      sisaUang: uangSisa,
      persentaseUang: persentase,
    });
  }

  componentDidMount() {
    this.fnHitung();
  }

  render() {
    return (
      <>
        <div className="container py-5">
          <div className="row">
            <div className="col-12 text-center">
              <h1 className="fw-bold">Financial Apps</h1>
              <hr className="w-75 mx-auto" />
              <h2 className="fw-bold">Rp. {this.state.sisaUang},-</h2>
              <span className="title-md">
                Sisa uang kamu tersisa {this.state.persentaseUang}% lagi
              </span>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-6">
              <div className="card-wrapper p-4">
                <div className="icon-wrapper">
                  <i className="bi bi-wallet2"></i>
                </div>
                <span className="title-sm">Pemasukan</span>
                <h3 className="fw-bold mt-1">
                  Rp. {this.state.pemasukanUang},-
                </h3>
                <div>
                  <span className="title-sm text-ungu fw-bold">
                    {this.state.transaksiIn}{" "}
                  </span>
                  <span className="title">Transaksi</span>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="card-wrapper p-4">
                <div className="icon-wrapper">
                  <i className="bi bi-cash"></i>
                </div>
                <span className="title-sm">Pengeluaran</span>
                <h3 className="fw-bold mt-1">
                  Rp. {this.state.pengeluaranUang},-
                </h3>
                <div>
                  <span className="title-sm text-ungu fw-bold">
                    {this.state.transaksiOut}{" "}
                  </span>
                  <span className="title">Transaksi</span>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-12 d-flex justify-content-between align-items-center">
              <h4 className="fw-bold">Ringkasan Transaksi</h4>
              <div className="wrapper-button d-flex">
                <ModalCreate
                  action={this.tambahItem}
                  kategori="IN"
                  variant="button btn-ungu px-3 py-2 me-2"
                  text="Pemasukan"
                  icon="bi bi-plus-circle-fill"
                  modalHeading="Tambah Pemasukan"
                />
                <ModalCreate
                  action={this.tambahItem}
                  kategori="OUT"
                  variant="button btn-pink px-3 py-2"
                  text="Pengeluaran"
                  icon="bi bi-dash-circle-fill"
                  modalHeading="Tambah Pengeluaran"
                />
              </div>
            </div>
          </div>

          <div className="row">
            {this.state.sumarry.map((sum, index) => {
              return (
                <div
                  key={index}
                  className="mb-3 col-12 d-flex justify-content-between align-items-center mt-2"
                >
                  <div className="d-flex align-items-center">
                    <div
                      className={
                        sum.kategori === "IN"
                          ? "icon-wrapper-in"
                          : "icon-wrapper-out"
                      }
                    >
                      <i
                        className={
                          sum.kategori === "IN"
                            ? "bi bi-wallet2"
                            : "bi bi-bag-dash"
                        }
                      ></i>
                    </div>
                    <div className="transaction ms-3 d-flex flex-column">
                      <h6>{sum.deskripsi}</h6>
                      <span className="title-sm">{sum.tanggal}</span>
                    </div>
                  </div>
                  <h5
                    className={
                      sum.kategori === "IN" ? "text-money-in" : "text-money-out"
                    }
                  >
                    Rp. {sum.nominal}
                  </h5>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default App;
