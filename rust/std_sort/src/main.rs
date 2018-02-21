extern crate rand;

use std::time::SystemTime;
use rand::{ thread_rng, Rng };

fn main() {
    let now = SystemTime::now();
    let len = 1_000_000_000;

    let mut vec = Vec::with_capacity(len);
    let mut rng = thread_rng();

    for _ in 0..len {
        // 这里不敢放肆用了u8，怕内存撑不住
        vec.push(rng.gen::<u8>());
    }

    vec.sort();

    // println!("{:?}", vec);
    println!("{:?}", now.elapsed());
    // Ok(Duration { secs: 136, nanos: 319578000 })
}
