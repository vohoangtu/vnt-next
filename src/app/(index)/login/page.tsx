'use client';

import React, { FormEvent, useEffect, useCallback, useMemo, useState } from "react";
import { Card, Col, Row, Dropdown } from "react-bootstrap";
import Link from "next/link";
import { useNotification } from '@/context/NotificationContext';
import Image from "next/image";
import { Variant } from "@/types/Variant";
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = React.useState("admin@example.com");
  const [password, setPassword] = React.useState("password");
  const [remember, setRemember] = React.useState(true);
  const [processing, setProcessing] = React.useState(false);
  const [disableButton, setDisableButton] = React.useState(false);

  const hotline = "123-456-7890"; // Example hotline
  const urlLogo = "/assets/images/login-logo.png"; // Example logo URL
  const dataBanner = ["banner1", "banner2"]; // Example data

  const { login, loading: authLoading, user } = useAuth();
  const { showMessage } = useNotification();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect');

  // If user is already logged in, redirect to dashboard
  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  const handleRememberChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setRemember(e.target.checked);
  }, []);

  const tryToLogIn = useCallback(async (event: FormEvent) => {
    event.preventDefault();
    setProcessing(true);
    try {
      console.log('email', email);
      console.log('password', password);
      console.log('remember', remember);  
      await login(email, password, remember);
      showMessage('Đăng nhập thành công!', Variant.Success);
      // Redirect will be handled by the useEffect above
    } catch (error: any) {
      showMessage(error.message || 'Đăng nhập thất bại!', Variant.Danger);
      setProcessing(false);
    }
  }, [email, password, remember, login, showMessage]);

  useEffect(() => {
    setDisableButton(!email || !password);
  }, [email, password]);

  // If still loading auth state, show loading
  if (authLoading) {
    return (
      <div className="page-loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // If already logged in, return null (redirect will happen in useEffect)
  if (user) {
    return null;
  }

  return (
    <div className="auth-page-wrapper">
      <div className="auth-page-content bg-gray">
        <Row>
          <Col
            className="mt-0 px-0 d-none d-md-block"
            lg={8}
            xl={8}
            md={8}
          >
            <div className="banner-login"></div>
          </Col>
          <Col md={4} lg={4} xl={4} className="p-0">
            <Card className="p-1 p-md-4 bg-login border-0">
              <div className="wrap-login-panel" id="loginForm">
                <div className="text-end mb-3">
                <Dropdown>
                  <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  <Image src="./chatbot.svg" alt="Support" width={33} height={35} className="me-2"></Image>
                  Support 24/7
                  </Dropdown.Toggle>

                  <Dropdown.Menu align={'end'} className="p-0">
                      <Dropdown.Item href={`tel:${hotline}`} className="p-2" >{hotline}</Dropdown.Item>
                  </Dropdown.Menu>
               </Dropdown>
                  
                </div>
                <div className="text-center mb-4 text-white-50">
                  <div>
                    <Link href="/" className="d-inline-block auth-logo">
                        {urlLogo ? (
                          <img
                            src={urlLogo}
                            alt=""
                            width="200"
                            height="200"
                            style={{ maxWidth: "100%" }}
                          />
                        ) : (
                          <div>Skeleton</div>
                        )}
                    </Link>
                  </div>
                </div>
                <div className="text-center mt-2 title-login">
                  <h2 className="m-0 wsp">Chào mừng bạn đến với <br />HỆ THỐNG VIETNAM TOURIST</h2>
                  <p className="m-0 my-2">Đăng nhập bằng tài khoản đã được cấp</p>
                </div>
                <div className="p-2 mt-2">
                  <form onSubmit={tryToLogIn}>
                    <div className="mb-3">
                      <label>Email:</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                    <label>Mật khẩu:</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <div className="form-check position-relative">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={remember}
                          onChange={handleRememberChange}
                        />
                        <label className="form-check-label">
                          Ghi nhớ đăng nhập
                        </label>
                      </div>
                    </div>
                    <div className="mt-4">
                      <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={disableButton || processing || authLoading}
                      >
                        {(processing || authLoading) ? 'Đang xử lý...' : 'Đăng nhập'}
                      </button>
                    </div>



                    <div className="py-3 link-remember">
                        <div
                          className="d-flex justify-between align-content-center align-items-center"
                        >
                          <div className="col text-center">
                            <Link href="/forgot-password" className="login-link-text text-primary text-decoration-none">
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g id="Icon/22/card">
                                    <path
                                      id="Vector"
                                      d="M19.25 3.66663H2.74998C2.24372 3.66663 1.83331 4.07703 1.83331 4.58329V17.4166C1.83331 17.9229 2.24372 18.3333 2.74998 18.3333H19.25C19.7562 18.3333 20.1666 17.9229 20.1666 17.4166V4.58329C20.1666 4.07703 19.7562 3.66663 19.25 3.66663Z"
                                      stroke="#7385FC"
                                      strokeWidth="1.5"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      id="Vector_2"
                                      d="M7.79165 11.4583C8.80415 11.4583 9.62498 10.6375 9.62498 9.62496C9.62498 8.61246 8.80415 7.79163 7.79165 7.79163C6.77914 7.79163 5.95831 8.61246 5.95831 9.62496C5.95831 10.6375 6.77914 11.4583 7.79165 11.4583Z"
                                      stroke="#7385FC"
                                      strokeWidth="1.5"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      id="Vector_3"
                                      d="M10.5417 14.2084C10.5417 12.6896 9.31047 11.4584 7.79169 11.4584C6.27291 11.4584 5.04169 12.6896 5.04169 14.2084"
                                      stroke="#7385FC"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      id="Vector_4"
                                      d="M12.8333 9.16663H16.5"
                                      stroke="#7385FC"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      id="Vector_5"
                                      d="M13.75 12.8334H16.5"
                                      stroke="#7385FC"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </g>
                                </svg>
                                Forgot Password
                              
                            </Link>
                          </div>
                          <div className="col text-center">
                            <Link href="/forgot-email"  className="login-link-text text-primary text-decoration-none">
                            
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g id="Icon/22/user">
                                    <path
                                      id="Vector"
                                      d="M12 10C14.2091 10 16 8.20914 16 6C16 3.79086 14.2091 2 12 2C9.79086 2 8 3.79086 8 6C8 8.20914 9.79086 10 12 10Z"
                                      stroke="#7385FC"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      id="Vector_2"
                                      d="M21 22C21 17.0294 16.9706 13 12 13C7.02945 13 3 17.0294 3 22"
                                      stroke="#7385FC"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </g>
                                </svg>
                                Forgot Email
                            
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="py-4">
                        <div className="d-flex list-policy justify-content-center">
                          <Link href="" passHref>
                            Connect
                          </Link>
                          |
                          <Link href="" passHref>
                            Policy
                          </Link>
                          |
                          <Link href="" passHref>
                            Safe
                          </Link>
                        </div>
                      </div>
                      <div className="copyright mt-3 text-center text-muted wsp">
                      Phần mềm hệ thống thuộc bản quyền của Công Ty Cổ Phần <br />
                      Thương Mại Và Dịch Vụ Du Lịch Vietnam Tourist
                      </div>
                  </form>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}