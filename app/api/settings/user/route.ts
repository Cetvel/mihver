import { NextRequest, NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import getM2MToken from '@/lib/m2m_token';
import { Users, init } from '@kinde/management-api-js';
import UserMongo from '@/features/users/models/user.model';
init();

init();

export async function PUT(req: NextRequest) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      console.warn('PUT request: User not authenticated');
      return NextResponse.json(
        { message: 'Yetkilendirme Hatası' },
        { status: 401 }
      );
    }
    const { username } = await req.json();

    if (username.includes(' ')) {
      return NextResponse.json(
        { message: 'Lütfen boşluk bırakmayınız' },
        { status: 400 }
      );
    }

    if (!username) {
      return NextResponse.json(
        { message: 'Kullanıcı adı boş olamaz.' },
        { status: 400 }
      );
    }

    await UserMongo.updateOne(
      { kindeId: user.id },
      { $set: { name: username } }
    );
    await Users.updateUser({
      id: user.id,
      /* @ts-ignore */
      username: username,
    });
    return NextResponse.json({ status: 200 });
  } catch (error: any) {
    console.error('İşlem hatası:', error);
    if (error.request.errors['429'] == 'Request was throttled.') {
      return NextResponse.json(
        { message: 'Bu kullanıcı ismi önceden alınmış.' },
        { status: 429 }
      );
    }
    return NextResponse.json(
      { message: 'Beklenmedik Sunucu Hatası' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      console.warn(
        'Yetkilendirme Hatası DELETE request: User not authenticated'
      );
      return NextResponse.json(
        { message: 'Yetkilendirme Hatası' },
        { status: 401 }
      );
    }

    await Users.deleteUser({
      id: user.id,
      isDeleteProfile: true,
    });
    await UserMongo.deleteOne({ kindeId: user.id });
  } catch (error) {
    console.error('İşlem hatası:', error);
    return NextResponse.json(
      { message: 'Beklenmedik Sunucu Hatası' },
      { status: 500 }
    );
  }
}
