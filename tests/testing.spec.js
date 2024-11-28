import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  // Session 1: ลงทะเบียน (Sign Up)
  console.log('Session 1: ลงทะเบียน');
  await page.goto('http://127.0.0.1:3000/');
  await page.getByRole('navigation').getByRole('link', { name: 'Sign Up' }).click();

  // กรอกอีเมลผิดในหลากหลายรูปแบบ
  await page.getByRole('button', { name: 'Sign up' }).click(); // อีเมลว่าง
  await page.getByLabel('Email').fill('pun'); // ไม่มีโดเมน
  await page.getByRole('button', { name: 'Sign up' }).click();
  await page.getByLabel('Email').fill('pun@'); // ไม่มีชื่อโดเมน
  await page.getByRole('button', { name: 'Sign up' }).click();
  await page.getByLabel('Email').fill('pun@gmail'); // ไม่มี TLD
  await page.getByRole('button', { name: 'Sign up' }).click();

  // กรอกอีเมลถูกต้อง
  await page.getByLabel('Email').fill('pun123@gmail.com');
  await page.getByRole('button', { name: 'Sign up' }).click();

  // กรอก Username ผิดและถูก
  await page.getByRole('button', { name: 'Sign up' }).click(); // Username ว่าง
  await page.getByLabel('Username').fill('yu'); // Username สั้นเกินไป
  await page.getByRole('button', { name: 'Sign up' }).click();
  await page.getByLabel('Username').fill('yuyumimi123');
  await page.getByRole('button', { name: 'Sign up' }).click();

  // รหัสผ่านผิดและถูก
  await page.getByLabel('Password', { exact: true }).fill('123'); // รหัสผ่านสั้นเกินไป
  await page.getByRole('button', { name: 'Sign up' }).click();
  await page.getByLabel('Password', { exact: true }).fill('123456'); // รหัสผ่านไม่ตรงกัน
  await page.getByLabel('Confirm Password').fill('654321');
  await page.getByRole('button', { name: 'Sign up' }).click();

  // รหัสผ่านและยืนยันรหัสผ่านถูกต้อง
  await page.getByLabel('Confirm Password').fill('123456');
  await page.getByRole('button', { name: 'Sign up' }).click();

  // Session 2: สร้างโพสต์
  console.log('Session 2: สร้างโพสต์');
  await page.getByRole('link', { name: 'Create Post' }).click();

  // กรอกโพสต์ผิดและถูก
  await page.getByRole('button', { name: 'Post' }).click(); // ว่างเปล่า
  await page.getByLabel('Title').fill('อยากกินไก่ย่าง');
  await page.getByLabel('Content').fill('ซี่โครงให้หมากลับบ้านหนึ่งที่ค่ะ');
  await page.getByRole('button', { name: 'Post' }).click();

  // Session 3: แก้ไขโพสต์
  console.log('Session 3: แก้ไขโพสต์');
  await page.getByRole('link', { name: 'Edit' }).click();
  await page.getByLabel('Title').fill('อยากกินไก่ย่างจัง');
  await page.getByLabel('Content').fill('ซี่โครงให้หมากลับบ้านหนึ่งที่ค่ะ อิอิ');
  await page.getByRole('button', { name: 'Update Post' }).click();

  // Session 4: เพิ่มไลค์/เลิกไลค์ และคอมเมนต์ 
  console.log('Session 4: เพิ่มไลค์/เลิกไลค์ และคอมเมนต์');
  await page.getByRole('button', { name: 'Like' }).click(); // Like
  await page.getByRole('button', { name: 'Unlike' }).click(); // Unlike

  // เพิ่มคอมเมนต์
  await page.getByPlaceholder('Add a comment...').fill('คนโพสต์สวยจัง');
  await page.getByRole('button', { name: 'Comment' }).click();
  await page.getByPlaceholder('Add a comment...').fill('เยี่ยมมาก!');
  await page.getByRole('button', { name: 'Comment' }).click();

  // ลบคอมเมนต์
  page.once('dialog', async dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    expect(dialog.message()).toBe('Are you sure you want to delete this comment?');
    await dialog.dismiss();
  });
  await page.getByRole('button', { name: 'Delete' }).first().click();

  // Session 5: ค้นหาโพสต์
  console.log('Session 5: ค้นหาโพสต์');
  await page.getByPlaceholder('Search posts...').fill('ไก่');
  await page.getByRole('button', { name: 'Search' }).click();
  await page.getByPlaceholder('Search posts...').fill('หมา');
  await page.getByRole('button', { name: 'Search' }).click();

  // Session 6: เข้าสู่ระบบและออกจากระบบ 
  console.log('Session 6: เข้าสู่ระบบและออกจากระบบ');
  await page.getByRole('link', { name: 'Logout' }).click();
  await page.getByRole('navigation').getByRole('link', { name: 'Login' }).click();

  // ทดสอบการเข้าสู่ระบบผิด
  await page.getByRole('button', { name: 'Log in' }).click(); // ฟิลด์ว่าง
  await page.getByLabel('Username').fill('wronguser');
  await page.getByLabel('Password').fill('wrongpass');
  await page.getByRole('button', { name: 'Log in' }).click();

  // ทดสอบการเข้าสู่ระบบถูกต้อง
  await page.getByLabel('Username').fill('yuyumimi123');
  await page.getByLabel('Password').fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('link', { name: 'Logout' }).click();

  // Session 7: ลืมรหัสผ่าน
  console.log('Session 7: ลืมรหัสผ่าน');
  await page.getByRole('link', { name: 'Forgot your password?' }).click();

  // กรอกอีเมลรีเซ็ตรหัสผ่าน
  await page.getByLabel('Email').fill('yuyumimi123@gmail.com');
  await page.getByRole('button', { name: 'Reset Password' }).click();

  console.log('ทดสอบสำเร็จ');
});
